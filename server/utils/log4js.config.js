const path = require('path');

var logPath = process.env.LOG_PATH || path.resolve(__dirname,'../../logs');

module.exports  = {
	"appenders": {
		"console": { type: 'console' },
		"access": {
			"type": "dateFile",
			"filename": path.join(logPath, './access'),
			"pattern": "-yyyy-MM-dd.log",
			"category": "http",
			"alwaysIncludePattern":true,  // 文件名是否始终包含占位符
			layout: {                       // (optional) the layout to use for messages
				type: "pattern",
				pattern: "%d [%p] %c - %m",
			},
		},
		"log": {
			"type": "file",
			"filename": path.join(logPath, './log.log'),
			"maxLogSize": 10485760,
			"numBackups": 3
		},
		"errorFile": {
			"type": "file",
			"filename": path.join(logPath, './errors.log'),
		},
		"errors": {
			"type": "logLevelFilter",
			"level": "ERROR",
			"appender": "errorFile"
		}
	},
	"categories": {
		"default": { "appenders": [ "log", "errors","access","console"], "level": "DEBUG" },
		"http": { "appenders": [ "access"], "level": "DEBUG" }
	}
}

