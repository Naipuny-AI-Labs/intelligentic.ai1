import { MigrationInterface, QueryRunner } from 'typeorm'
import { getNodeModulesPackagePath } from '../../../utils'
import path from 'path'
import { promises } from 'fs'
import { Dirent } from 'fs'
import { IComponentCredentials, IComponentNodes } from '../../../Interface'
import { ICommonObject } from 'intelligenticai-components'
import { cloneDeep } from 'lodash'

export class AddNodesEntityInsert1743471664812 implements MigrationInterface {
    componentNodes: IComponentNodes = {}
    componentCredentials: IComponentCredentials = {}
    private credentialIconPath: ICommonObject = {}
    public async up(queryRunner: QueryRunner): Promise<void> {
        await this.initializeNodes()
        const dbResponse = []
        for (const nodeName in this.componentNodes) {
            const clonedNode = cloneDeep(this.componentNodes[nodeName])
            dbResponse.push(clonedNode)
        }
        await queryRunner.query(
            `INSERT INTO nodes(
	accesstype, "nodeData", "createdDate", "updatedDate")
	VALUES ('trail', '${JSON.stringify(dbResponse)}',now(), now());`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`DROP TABLE nodes`)
    }
    private async initializeNodes() {
        const disabled_nodes = process.env.DISABLED_NODES ? process.env.DISABLED_NODES.split(',') : []
        const packagePath = getNodeModulesPackagePath('intelligenticai-components')
        const nodesPath = path.join(packagePath, 'dist', 'nodes')
        const nodeFiles = await this.getFiles(nodesPath)
        return Promise.all(
            nodeFiles.map(async (file) => {
                if (file.endsWith('.js')) {
                    const nodeModule = await require(file)

                    if (nodeModule.nodeClass) {
                        const newNodeInstance = new nodeModule.nodeClass()
                        newNodeInstance.filePath = file

                        // Replace file icon with absolute path
                        if (
                            newNodeInstance.icon &&
                            (newNodeInstance.icon.endsWith('.svg') ||
                                newNodeInstance.icon.endsWith('.png') ||
                                newNodeInstance.icon.endsWith('.jpg'))
                        ) {
                            const filePath = file.replace(/\\/g, '/').split('/')
                            filePath.pop()
                            const nodeIconAbsolutePath = `${filePath.join('/')}/${newNodeInstance.icon}`
                            newNodeInstance.icon = nodeIconAbsolutePath

                            // Store icon path for componentCredentials
                            if (newNodeInstance.credential) {
                                for (const credName of newNodeInstance.credential.credentialNames) {
                                    this.credentialIconPath[credName] = nodeIconAbsolutePath
                                }
                            }
                        }

                        const skipCategories = ['Analytic', 'SpeechToText']
                        const conditionOne = !skipCategories.includes(newNodeInstance.category)

                        //const isCommunityNodesAllowed = appConfig.showCommunityNodes
                        const isAuthorPresent = newNodeInstance.author
                        let conditionTwo = true
                        if (isAuthorPresent) conditionTwo = false

                        const isDisabled = disabled_nodes.includes(newNodeInstance.name)
                        newNodeInstance['ispremium'] = isDisabled
                        //logger.info(newNodeInstance)

                        if (conditionOne && conditionTwo) {
                            this.componentNodes[newNodeInstance.name] = newNodeInstance
                        }
                    }
                }
            })
        )
    }
    private async getFiles(dir: string): Promise<string[]> {
        const dirents = await promises.readdir(dir, { withFileTypes: true })
        const files = await Promise.all(
            dirents.map((dirent: Dirent) => {
                const res = path.resolve(dir, dirent.name)
                return dirent.isDirectory() ? this.getFiles(res) : res
            })
        )
        return Array.prototype.concat(...files)
    }
}
