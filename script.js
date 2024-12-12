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
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = 'SQL已自动美化并复制到剪贴板！';
            document.body.appendChild(toast);

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
        // 清理SQL语句，移除可能被误复制的内容
        sql = sql.replace(/Preparing:\s*/i, '') // 移除 "Preparing:"
            .replace(/Parameters:\s*/i, '') // 移除 "Parameters:"
            .trim();

        // 清理参数字符串
        params = params.replace(/Parameters:\s*/i, '').trim();

        // 定义需要添加引号的类型列表
        const quotedTypes = [
            'string', 'varchar', 'char', 'text', 'longtext',
            'date', 'datetime', 'timestamp', 'time',
            'enum', 'set', 'json', 'uuid'
        ];

        const parameters = params ? params.split(',').map(param => {
            const match = param.trim().match(/(.*?)\((.*?)\)/);
            if (match) {
                let value = match[1].trim();
                const type = match[2].trim().toLowerCase();

                // 处理null值
                if (value.toLowerCase() === 'null') {
                    return {
                        value: 'NULL',
                        type: type,
                        needQuotes: false
                    };
                }

                // 移除已有的引号
                if (value.startsWith("'") && value.endsWith("'")) {
                    value = value.slice(1, -1);
                }

                return {
                    value: value,
                    type: type,
                    needQuotes: quotedTypes.includes(type.toLowerCase())
                };
            }
            return {
                value: param.trim(),
                type: 'Unknown',
                needQuotes: false
            };
        }) : [];

        let resultSQL = sql;
        let questionMarkCount = (sql.match(/\?/g) || []).length;
        let paramIndex = 0;

        while (resultSQL.includes('?') && paramIndex < parameters.length) {
            const param = parameters[paramIndex];
            let finalValue;

            if (param.value.toLowerCase() === 'null') {
                finalValue = 'NULL';
            } else {
                finalValue = param.needQuotes ? `'${param.value}'` : param.value;
            }

            resultSQL = resultSQL.replace('?', finalValue);
            paramIndex++;
        }

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
        return sql
            .replace(/\s+/g, ' ')
            .replace(/\s*,\s*/g, ',\n  ')
            .replace(/\s*SELECT\s+/gi, 'SELECT\n  ')
            .replace(/\s*FROM\s+/gi, '\nFROM\n  ')
            .replace(/\s*WHERE\s+/gi, '\nWHERE\n  ')
            .replace(/\s*AND\s+/gi, '\n  AND ')
            .replace(/\s*OR\s+/gi, '\n  OR ')
            .replace(/\s*ORDER BY\s+/gi, '\nORDER BY\n  ')
            .replace(/\s*GROUP BY\s+/gi, '\nGROUG BY\n  ')
            .replace(/\s*HAVING\s+/gi, '\nHAVING\n  ')
            .trim();
    }
});