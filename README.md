# MyBatis日志SQL转换工具

这是一个优雅的在线工具，用于将MyBatis日志转换为可执行的SQL语句。采用苹果风格设计，简洁优雅。

## 在线预览

[点击这里查看在线演示](https://nie0357.github.io/MybatisLog)

## 功能特点

- 支持输入MyBatis的Preparing和Parameters日志
- 自动解析并组合成完整SQL语句
- SQL语句美化与格式化
- 一键复制功能
- 参数名称与值的清晰展示
- 响应式设计，支持各种设备
- 优雅的苹果风格界面
- 自动美化SQL并复制到剪贴板

## 使用方法

1. 从MyBatis日志中复制Preparing部分的SQL语句，粘贴到第一个输入框
2. 从MyBatis日志中复制Parameters部分的参数，粘贴到第二个输入框
3. 点击"转换SQL"按钮
4. SQL会自动美化并复制到剪贴板

### 示例输入

Preparing:
```sql
SELECT * FROM users WHERE id = ? AND name = ?
```

Parameters:
```
1(Integer), 'John'(String)
```

### 示例输出

```sql
SELECT
  *
FROM
  users
WHERE
  id = 1
  AND name = 'John'
```

## 页面结构

- 顶部：简洁的标题栏
- 主要内容区：
  - 左侧：MyBatis日志输入框
  - 右侧：转换后的SQL显示区域
- 底部：功能按钮区（转换、美化、复制）
- 参数展示区：以表格形式展示参数名和值

## 使用技术

- HTML5
- CSS3 (Flexbox + Grid)
- JavaScript (原生)

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/nie0357/MybatisLog.git
cd MybatisLog
```

2. 使用任意HTTP服务器运行项目，例如：
```bash
# 使用Python
python -m http.server 3000
# 或使用Node.js的http-server
npx http-server
```

3. 在浏览器中访问 `http://localhost:3000`

## 贡献

欢迎提交Issue和Pull Request！

## 许可证

MIT License