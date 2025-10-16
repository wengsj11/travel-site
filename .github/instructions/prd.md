# PRD: 旅行网站 - MCP 与说明文档

## 1. 目标
创建与项目相关的产品需求及操作说明文档，并提供在本地通过 VSCode 提交到 GitHub 的步骤，以及配置并启动 GitHub MCP Server 的说明。

## 1.1 产物
- `.github/instructions/prd.md`（本文件）
- `.vscode/mcp.json`（MCP server 配置）

## 1.2 操作步骤（提交 PRD）
1. 在代码仓库根目录下新增或修改相关说明文件（例如 `.github/instructions/prd.md`）。
2. 在 VSCode 或终端中执行 git add/commit，提交改动。建议使用语义化的提交信息，例如：
   - 示例（由 Copilot 风格生成）：
     "chore: add PRD and MCP setup instructions"
3. 将本地分支推送到 GitHub 远端（例如：git push origin main）。
4. 在 GitHub 上创建 Pull Request（如需要），并完成合并流程。

> 注意：如果仓库启用了分支保护或需要通过 PR 才能合并，请遵循组织的分支策略。

## 2. 目标：配置 GitHub MCP Server
在 VSCode 中配置并启动 MCP server，使 Copilot / MCP 能够与本地 VSCode 进行集成（按组织与个人授权流程）。

## 2.1 步骤：创建 MCP 配置文件
1. 在 `.vscode` 文件夹下创建 `mcp.json`，其内容示例：

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    }
  }
}
```

2. 保存文件后，在 VSCode 的 MCP 界面打开该 `mcp.json` 并点击 "Start"（或相应的启动按钮）。
3. 根据提示完成身份验证（OAuth / GitHub 登录），允许必要的权限。

## 2.2 启动与验证
- 启动后，检查 VSCode 的输出或扩展界面，确认 MCP server 已成功连接并已认证。
- 如遇到认证问题，请确认网络访问、组织策略以及所需权限。

## 3. 质量与注意点
- 提交信息应简洁并包含变更目的。
- MCP 的 URL 与认证信息可能随官方策略变更，请以官方文档为准。
- 不要在仓库中提交任何私密凭证或 token；认证过程应通过交互式 OAuth 完成。

## 4. 后续动作（可选）
- 如果需要，可在 README 中加入 MCP 使用指南。
- 若公司/项目需要，把 MCP 配置与 CI/CD 或开发环境标准化，写入团队文档。

---

创建人：自动化脚本 / 文档作者
日期：2025-10-16
