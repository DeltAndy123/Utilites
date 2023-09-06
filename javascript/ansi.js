const AnsiCodes = {
  _e: '\u001b',
  Colors: {
    Black: '30',
    Red: '31',
    Green: '32',
    Yellow: '33',
    Blue: '34',
    Purple: '35',
    Cyan: '36',
    LightGray: '37',
    DarkGray: '90',
    LightRed: '91',
    LightGreen: '92',
    LightYellow: '93',
    LightBlue: '94',
    LightPurple: '95',
    LightCyan: '96',
    White: '97',
  },
  BackgroundColors: {
    Black: '40',
    Red: '41',
    Green: '42',
    Yellow: '43',
    Blue: '44',
    Purple: '45',
    Cyan: '46',
    LightGray: '47',
    DarkGray: '100',
    LightRed: '101',
    LightGreen: '102',
    LightYellow: '103',
    LightBlue: '104',
    LightPurple: '105',
    LightCyan: '106',
    White: '107', 
  },
  Formats: {
    Bold: '1',
    Dim: '2',
    Underline: '4',
    Blink: '5',
    Reverse: '7',
    Hidden: '8',
  },
  Reset: '\u001b[0m',
  Clear: `\u001b[2J\u001b[0;0H`,
  ClearLine: `\u001b[2K\u001b[0G`,
}

class AnsiBuilder {
  items = []
  text

  add(color) {
    this.items.push(color)
    return this
  }

  remove(color) {
    this.items = this.items.filter(item => item !== color)
    return this
  }

  build() {
    if (this.text) {
      return `${AnsiCodes._e}[${this.items.join(';')}m${this.text}${AnsiCodes.Reset}`
    } else {
      return `${AnsiCodes._e}[${this.items.join(';')}m`
    }
  }

  setText(text) {
    this.text = text
    return this
  }

  reset() {
    this.items = []
    return this
  }

}

const Ansi = {
  Colors: {
    Black: (t) => `\u001b[30m${t}${AnsiCodes.Reset}`,
    Red: (t) => `\u001b[31m${t}${AnsiCodes.Reset}`,
    Green: (t) => `\u001b[32m${t}${AnsiCodes.Reset}`,
    Yellow: (t) => `\u001b[33m${t}${AnsiCodes.Reset}`,
    Blue: (t) => `\u001b[34m${t}${AnsiCodes.Reset}`,
    Purple: (t) => `\u001b[35m${t}${AnsiCodes.Reset}`,
    Cyan: (t) => `\u001b[36m${t}${AnsiCodes.Reset}`,
    LightGray: (t) => `\u001b[37m${t}${AnsiCodes.Reset}`,
    DarkGray: (t) => `\u001b[90m${t}${AnsiCodes.Reset}`,
    LightRed: (t) => `\u001b[91m${t}${AnsiCodes.Reset}`,
    LightGreen: (t) => `\u001b[92m${t}${AnsiCodes.Reset}`,
    LightYellow: (t) => `\u001b[93m${t}${AnsiCodes.Reset}`,
    LightBlue: (t) => `\u001b[94m${t}${AnsiCodes.Reset}`,
    LightPurple: (t) => `\u001b[95m${t}${AnsiCodes.Reset}`,
    LightCyan: (t) => `\u001b[96m${t}${AnsiCodes.Reset}`,
    White: (t) => `\u001b[97m${t}${AnsiCodes.Reset}`,
  },
  BackgroundColors: {
    Black: (t) => `\u001b[40m${t}${AnsiCodes.Reset}`,
    Red: (t) => `\u001b[41m${t}${AnsiCodes.Reset}`,
    Green: (t) => `\u001b[42m${t}${AnsiCodes.Reset}`,
    Yellow: (t) => `\u001b[43m${t}${AnsiCodes.Reset}`,
    Blue: (t) => `\u001b[44m${t}${AnsiCodes.Reset}`,
    Purple: (t) => `\u001b[45m${t}${AnsiCodes.Reset}`,
    Cyan: (t) => `\u001b[46m${t}${AnsiCodes.Reset}`,
    LightGray: (t) => `\u001b[47m${t}${AnsiCodes.Reset}`,
    DarkGray: (t) => `\u001b[100m${t}${AnsiCodes.Reset}`,
    LightRed: (t) => `\u001b[101m${t}${AnsiCodes.Reset}`,
    LightGreen: (t) => `\u001b[102m${t}${AnsiCodes.Reset}`,
    LightYellow: (t) => `\u001b[103m${t}${AnsiCodes.Reset}`,
    LightBlue: (t) => `\u001b[104m${t}${AnsiCodes.Reset}`,
    LightPurple: (t) => `\u001b[105m${t}${AnsiCodes.Reset}`,
    LightCyan: (t) => `\u001b[106m${t}${AnsiCodes.Reset}`,
    White: (t) => `\u001b[107m${t}${AnsiCodes.Reset}`,
  },
  Formats: {
    Bold: (t) => `\u001b[1m${t}${AnsiCodes.Reset}`,
    Dim: (t) => `\u001b[2m${t}${AnsiCodes.Reset}`,
    Italic: (t) => `\u001b[3m${t}${AnsiCodes.Reset}`,
    Underline: (t) => `\u001b[4m${t}${AnsiCodes.Reset}`,
    Inverse: (t) => `\u001b[7m${t}${AnsiCodes.Reset}`,
    Hidden: (t) => `\u001b[8m${t}${AnsiCodes.Reset}`,
    Strikethrough: (t) => `\u001b[9m${t}${AnsiCodes.Reset}`,
  },
}

const logger = {
  debug(...input) {
    console.log(Ansi.Formats.Bold(Ansi.Colors.LightGray('[DEBUG]')), ...input)
  },
  info(input) {
    var text = input
    switch (typeof input) {
      case 'object':
        if (input instanceof Error) break
        text = JSON.stringify(input, null, 2)
      break
    }
    `${text}`.split('\n').forEach((t) => {
      console.log(Ansi.Formats.Bold(Ansi.Colors.DarkGray('[INFO] ')) + t)
    })
  },
  warn(text) {
    console.warn(Ansi.Formats.Bold(Ansi.Colors.LightYellow('[WARN] ')) + text)
  },
  error(error) {
    if (error instanceof Error) {
      const prefix = Ansi.Formats.Bold(Ansi.Colors.Red(`[${error.name.toUpperCase()}] `))
      console.error(prefix + error.message)
      const stack = error.stack.split('\n').slice(1)
      stack.forEach((line) => {
        console.error(prefix + line)
      })
    } else {
      const prefix = Ansi.Formats.Bold(Ansi.Colors.Red('[ERROR] '))
      console.error(prefix + error)
    }
  }
}

if (typeof exports == 'object' && typeof module == 'object') {
  module.exports = {
    AnsiCodes,
    AnsiBuilder,
    Ansi,
    logger
  }
} else if (typeof define == 'function' && define['amd']) {
  define([], function() {
    return {
      AnsiCodes,
      AnsiBuilder,
      Ansi,
      logger
    }
  })
} else if (typeof exports == 'object') {
  exports['AnsiCodes'] = AnsiCodes
  exports['AnsiBuilder'] = AnsiBuilder
  exports['Ansi'] = Ansi
  exports['logger'] = logger
}