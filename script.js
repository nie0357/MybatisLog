document.addEventListener('DOMContentLoaded', function () {
    const preparingLog = document.getElementById('preparingLog');
    const parametersLog = document.getElementById('parametersLog');
    const sqlResult = document.getElementById('sqlResult');
    const paramsTable = document.getElementById('paramsTable').getElementsByTagName('tbody')[0];
    const convertBtn = document.getElementById('convertBtn');
    const beautifyBtn = document.getElementById('beautifyBtn');
    const copyBtn = document.getElementById('copyBtn');

    // 转换SQL按钮点击事件
    convertBtn.addEventListener('click', function () {
        const preparing = preparingLog.value.trim();
        const parameters = parametersLog.value.trim();

        if (!preparing) {
            alert('请输入Preparing部分的SQL语句');
            return;
        }

        const result = processSQL(preparing, parameters);
        // 自动美化SQL
        const beautifiedSQL = beautifySQL(result.sql);
        displayResult({
            sql: beautifiedSQL,
            parameters: result.parameters
        });

        // 自动复制SQL到剪贴板
        navigator.clipboard.writeText(beautifiedSQL).then(() => {
            // 创建一个临时提示元素
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = 'SQL已自动美化并复制到剪贴板！';
            document.body.appendChild(toast);

            // 2秒后移除提示
            setTimeout(() => {
                toast.classList.add('toast-hide');
                setTimeout(() => document.body.removeChild(toast), 300);
            }, 2000);
        });
    });

    // 美化SQL按钮点击事件
    beautifyBtn.addEventListener('click', function () {
        const sql = sqlResult.textContent;
        if (sql) {
            sqlResult.textContent = beautifySQL(sql);
        }
    });

    // 复制SQL按钮点击事件
    copyBtn.addEventListener('click', function () {
        const sql = sqlResult.textContent;
        if (sql) {
            navigator.clipboard.writeText(sql).then(() => {
                alert('SQL已复制到剪贴板！');
            });
        }
    });

    // 处理SQL和参数
    function processSQL(sql, params) {
        const parameters = params ? params.split(',').map(param => {
            const match = param.trim().match(/(.*?)\((.*?)\)/);
            if (match) {
                const value = match[1].trim();
                const type = match[2].trim().toLowerCase();
                return {
                    value: value,
                    type: type,
                    // 判断是否需要添加引号
                    needQuotes: ['string', 'date', 'timestamp', 'datetime', 'time'].includes(type.toLowerCase())
                };
            }
            return {
                value: param.trim(),
                type: 'Unknown',
                needQuotes: false
            };
        }) : [];

        let resultSQL = sql;
        parameters.forEach((param, index) => {
            let paramValue = param.value;
            // 如果参数值已经带有引号，则移除外层引号
            if (paramValue.startsWith("'") && paramValue.endsWith("'")) {
                paramValue = paramValue.slice(1, -1);
            }
            // 根据类型决定是否添加引号
            const finalValue = param.needQuotes ? `'${paramValue}'` : paramValue;
            resultSQL = resultSQL.replace('?', finalValue);
        });

        return {
            sql: resultSQL,
            parameters: parameters
        };
    }

    // 显示结果
    function displayResult(result) {
        sqlResult.textContent = result.sql;

        // 清空并重新填充参数表格
        paramsTable.innerHTML = '';
        result.parameters.forEach((param, index) => {
            const row = paramsTable.insertRow();
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = param.value;
            row.insertCell(2).textContent = param.type;
        });
    }

    // SQL美化函数
    function beautifySQL(sql) {
        // 简单的SQL美化逻辑
        return sql
            .replace(/\s+/g, ' ')
            .replace(/\s*,\s*/g, ',\n  ')
            .replace(/\s*SELECT\s+/gi, 'SELECT\n  ')
            .replace(/\s*FROM\s+/gi, '\nFROM\n  ')
            .replace(/\s*WHERE\s+/gi, '\nWHERE\n  ')
            .replace(/\s*AND\s+/gi, '\n  AND ')
            .replace(/\s*OR\s+/gi, '\n  OR ')
            .replace(/\s*ORDER BY\s+/gi, '\nORDER BY\n  ')
            .replace(/\s*GROUP BY\s+/gi, '\nGROUP BY\n  ')
            .replace(/\s*HAVING\s+/gi, '\nHAVING\n  ')
            .trim();
    }
});