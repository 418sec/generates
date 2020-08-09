#!/usr/bin/env node

const { promises: fs } = require('fs')
const cli = require('@ianwalter/cli')
const { print } = require('@ianwalter/print')

async function run () {
  const options = cli({ name: 'generates' })
  const name = options._[0]
  if (name) {
    let Generator
    try {
      //
      Generator = require(`@generates/${name}`)

      //
      delete options._

      //
      const generator = new Generator({ options })

      //
      const files = await generator.generate()

      //
      const toWriteFile = async ([file, content]) => fs.writeFile(file, content)
      await Promise.all(Object.entries(files).map(toWriteFile))
    } catch (err) {
      print.error(err) // TODO: add helpful error message.
    }
  } else {
    // TODO: add helpful error message.
  }
}

run()
