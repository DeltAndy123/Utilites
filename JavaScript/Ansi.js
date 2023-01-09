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
  Colors: {},
  BackgroundColors: {},
  Formats: {}
}
Object.entries(AnsiCodes.Colors).forEach(([color, code]) => {
  Ansi.Colors[color] = (text) => {
    return `\u001b[${code}m${text}${AnsiCodes.Reset}`
  }
})
Object.entries(AnsiCodes.BackgroundColors).forEach(([bgcolor, code]) => {
  Ansi.BackgroundColors[bgcolor] = (text) => {
    return `\u001b[${code}m${text}${AnsiCodes.Reset}`
  }
})
Object.entries(AnsiCodes.Formats).forEach(([format, code]) => {
  Ansi.Formats[format] = (text) => {
    return `\u001b[${code}m${text}${AnsiCodes.Reset}`
  }
})

const logger = {
  debug(input) {
    console.log(Ansi.Formats.Bold(Ansi.Colors.LightGray('[DEBUG]')), input)
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

module.exports = {
  AnsiCodes,
  AnsiBuilder,
  Ansi,
  logger
}