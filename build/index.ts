/*
 * @Author: Xiao Xiang Lun
 * @LastEditors: Xiao Xiang Lun
 * @Date: 2023-06-29 15:10:33
 * @LastEditTime: 2023-07-04 18:10:14
 * @FilePath: /snow-keyboard/build/index.ts
 * @Environment: Win 10 node.js V 12.13.0
 * @Description:
 * 关注作者请访问 https://snowlove.synology.me:5
 */
import * as fs from 'fs'
import path from 'path'
import packageJson from '../package.json'

// 清空publish下文件
const // version =  "0.0.2-alpha",
  publishPath = path.resolve(__dirname, '../publish'),
  newPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    author: packageJson.author,
    files: packageJson.files,
    main: rewritePath(packageJson.main),
    module: rewritePath(packageJson.module),
    types: rewritePath(packageJson.types),
    keywords: packageJson.keywords,
  }
;(function deleteFolderRecursive(folderPath: string | string[]) {
  if (Array.isArray(folderPath)) {
    folderPath.forEach((folderPathItem) => {
      //判断文件夹是否存在
      if (fs.existsSync(folderPathItem)) {
        //读取文件夹下的文件目录，以数组形式输出
        fs.readdirSync(folderPathItem).forEach((file) => {
          //拼接路径
          const curPath = path.join(folderPathItem, file)
          //判断是不是文件夹，如果是，继续递归
          if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath)
          } else {
            //删除文件或文件夹
            fs.unlinkSync(curPath)
          }
        })
        //仅可用于删除空目录
        publishPath !== folderPathItem && fs.rmdirSync(folderPathItem)
      }
    })
  } else {
    if (fs.existsSync(folderPath)) {
      //读取文件夹下的文件目录，以数组形式输出
      fs.readdirSync(folderPath).forEach((file) => {
        //拼接路径
        const curPath = path.join(folderPath, file)
        //判断是不是文件夹，如果是，继续递归
        if (fs.lstatSync(curPath).isDirectory()) {
          deleteFolderRecursive(curPath)
        } else {
          //删除文件或文件夹
          fs.unlinkSync(curPath)
        }
      })
      //仅可用于删除空目录
      publishPath !== folderPath && fs.rmdirSync(folderPath)
    }
  }
})([publishPath])

function rewritePath(path: string) {
  return path.replace('/publish', '/dist')
}

// 复制文件夹
function copyFolder(src: string, dist: string) {
  try {
    const files = fs.readdirSync(src)
    files.forEach((file) => {
      // 获取当前文件/文件夹的完整路径
      const srcFile = src + '/' + file,
        // 获取目标文件/文件夹的完整路径
        distFile = dist + '/' + file
      // 判断是文件还是文件夹
      const stat = fs.statSync(srcFile)
      // 对文件操作
      stat.isFile() && copyFile(srcFile, distFile)
      // 对文件夹操作
      stat.isDirectory() && copyFolder(srcFile, distFile)
    })
  } catch (err) {
    console.log(err)
  }
}

// 复制文件操作
function copyFile(srcFile: string, distFile: string) {
  const path = distFile.lastIndexOf('/')
  !fs.existsSync(distFile.substring(0, path)) &&
    fs.mkdirSync(distFile.substring(0, path))
  fs.createReadStream(srcFile).pipe(fs.createWriteStream(distFile))
}

fs.writeFileSync(
  path.resolve(__dirname, '../publish/package.json'),
  JSON.stringify(newPackageJson, null, 2),
)
// 拷贝文件
copyFolder(
  path.resolve(__dirname, '../dist'),
  path.resolve(__dirname, '../publish/dist'),
)
