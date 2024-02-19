<!DOCTYPE html>
<html>

<head>
    <title>MyBatis日志转换</title>
    <style>
        textarea {
            width: 100%;
            min-height: 150px;
            height: 100%
        }

        .btn_contain {
            margin: 0 30%;
            width: 100%
        }

        .btn {
            width: 200px;
            margin-left: 10px;
            height: 40px;
        }

        .m-toast-pop {
            display: none;
            position: fixed;
            width: 100%;
            top: 0;
            bottom: 0;
            right: 0;
            overflow: auto;
            text-align: center;
        }

        .m-toast-inner {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 100%;
            transform: translate(-50%, -50%);
            -webkit-transform: translate(-50%, -50%);
            text-align: center;
        }

        .m-toast-inner-text {
            display: inline-block;
            margin: 0 22px;
            padding: 19px 21px;
            font-size: 16px;
            color: #FFFFFF;
            letter-spacing: 0;
            line-height: 22px;
            background: rgba(0, 0, 0, 0.72);
            border-radius: 10px;
        }

        input {
            width: 100%;
            min-height: 150px;
            height: 100%
        }
    </style>
</head>

<body>
    <div>
        <label for="preparingInput">Preparing:</label>
        <!-- <label for="preparingInput" style="width: fit-content;display: inline-block;">Preparing:</label> -->
        <textarea id="preparingInput"></textarea>
    </div>
    <div>
        <!-- <label for="parametersInput" style="width: fit-content;display: inline-block;">Parameters:</label> -->
        <label for="parametersInput">Parameters:</label>
        <textarea id="parametersInput"></textarea>
    </div>

    <div class="btn_contain">
        <button class="btn" onclick="convertLog()" value="转换">转换</button>
        <button class="btn" onclick="reset();" value="重置">重置</button>
        <button class="btn" onclick="copySql();" value="复制结果">复制结果</button>
    </div>

    <div id="logContainer"></div>

    <div>
        <h3>转换后的SQL:</h3>
        <textarea id="convertedSql" readonly></textarea>
        <button onclick="copySql()">复制SQL</button>
    </div>

    <script>
        function convertLog() {
            var preparingInput = document.getElementById('preparingInput').value;
            var parametersInput = document.getElementById('parametersInput').value;

            // 创建日志信息的HTML元素
            var logElement = document.createElement('div');
            // 路径信息：
            let preparingMatches = preparingInput.match(/.*(Preparing[\s]*(?=:)):/);
            if (preparingMatches) {
                logElement.innerHTML = '<strong>Preparing：</strong>' + preparingMatches[1] + '<br>';
                logElement.innerHTML += '<strong>Preparing SQL：</strong>' + preparingMatches[2] + '<br>';
                logElement.innerHTML += '<strong>参数：</strong><br>';
            } else {
                logElement.innerHTML = '<strong>Preparing：</strong>' + preparingInput + '<br>';
                logElement.innerHTML += '<strong>参数：</strong><br>';
            }

            // 添加参数列表
            var parametersList = document.createElement('ul');
            var paramsStr = parametersInput.substring(parametersInput.indexOf(':') + 1).trim();
            var parameters = paramsStr.split(',');
            parameters.forEach(function (parameter) {
                parameter = parameter.trim();
                var parameterItem = document.createElement('li');

                // 处理null值
                if (parameter === 'null') {
                    parameterItem.textContent = 'null';
                } else {
                    parameterItem.textContent = parameter;
                }

                parametersList.appendChild(parameterItem);
            });

            logElement.appendChild(parametersList);

            // 将日志信息添加到页面
            var logContainer = document.getElementById('logContainer');
            logContainer.innerHTML = '';
            logContainer.appendChild(logElement);

            // 转换SQL并显示在文本框中
            var sql = convertToSql(preparingInput, parameters);
            var convertedSqlElement = document.getElementById('convertedSql');
            convertedSqlElement.value = sql;
        }

        function convertToSql(preparingInput, parameters) {
            var sql = preparingInput;
            var paramValues = parameters;

            for (var i = 0; i < paramValues.length; i++) {
                var param = paramValues[i].trim();
                if (param == 'null') {
                    sql = sql.replace('?', 'NULL');
                } else {
                    var regex = /([^\(]+)\(([^\)]+)\)/;
                    var matches = param.match(regex);
                    if (matches && matches.length === 3) {
                        var placeholder = matches[0];
                        var value = matches[1];
                        var type = matches[2];
                        sql = sql.replace('?', formatValue(value, type));
                    } else {
                        alert('转化失败，失败的参数为：' + param);
                    }
                }
            }

            return sql;
        }
        // 根据数据类型格式化参数值
        function formatValue(value, type) {
            if (type === 'Long' || type === 'Integer') {
                return value;
            } else if (type === 'String') {
                return "'" + value + "'";
            } else if (type === 'Date') {
                return "'" + formatDate(value) + "'";
            }

            // 处理其他类型的参数
            // 根据需要进行相应的处理逻辑

            return value;
        }

        // 获取参数的数据类型
        function getParamType(param) {
            if (param.endsWith('(Long)')) {
                return 'Long';
            } else if (param.endsWith('(String)')) {
                return 'String';
            } else if (param.endsWith('(Integer)')) {
                return 'Integer';
            } else if (param.endsWith('(Date)')) {
                return 'Date';
            } else {
                // 如果有其他类型的参数，可以在这里进行处理
                // 根据需要返回相应的数据类型
            }
        }

        // 解析Date类型的参数值
        function parseDateValue(param) {
            var dateString = param.substring(0, param.indexOf('(Date)')).trim();

            // 根据实际的日期格式进行解析
            // 这里假设日期格式是"yyyy-MM-dd"
            var dateParts = dateString.split('-');
            var year = parseInt(dateParts[0]);
            var month = parseInt(dateParts[1]) - 1; // JavaScript中月份从0开始，所以需要减去1
            var day = parseInt(dateParts[2]);

            var dateValue = new Date(year, month, day);

            // 返回格式化后的日期字符串
            return formatDate(dateValue);
        }

        // 格式化日期为"yyyy-MM-dd"格式
        function formatDate(date) {
            var year = date.getFullYear();
            var month = padZero(date.getMonth() + 1); // 月份加1后补零
            var day = padZero(date.getDate());

            return year + '-' + month + '-' + day;
        }

        // 补零函数，用于在个位数的月份或日期前补零
        function padZero(num) {
            return num < 10 ? '0' + num : num;
        }

        function copySql() {
            var convertedSqlElement = document.getElementById('convertedSql');

            // 选择文本
            convertedSqlElement.select();
            convertedSqlElement.setSelectionRange(0, 99999); // 兼容移动设备

            // 复制文本
            document.execCommand('copy');

        }

        function reset() {
            var sql = document.getElementById('preparingInput');
            var para = document.getElementById('parametersInput');
            var result = document.getElementById('convertedSql');
            var logContainer = document.getElementById('logContainer');
            // sql.reset();
            // para.reset();
            // result.reset();
            sql.value = '';
            para.value = '';
            result.value = '';
            // 创建日志信息的HTML元素
            var logElement = document.createElement('div');
            logContainer.innerHTML = '';
            logContainer.appendChild(logElement);
        }
    </script>
</body>

</html>
