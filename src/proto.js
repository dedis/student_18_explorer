import { Message } from 'protobufjs/light'
import { EMPTY_BUFFER, registerMessage, addJSON } from '@dedis/cothority/protobuf'
import models from './models.json'
import project from './project.json'

addJSON(models)
addJSON(project)

export class Transaction extends Message {
  static register () { registerMessage('Transaction', Transaction) }
}

export class Footer extends Message {
  static register () { registerMessage('Footer', Footer) }
}

export class Election extends Message {
  static register () { registerMessage('Election', Election, Footer) }
  constructor (properties) {
    super(properties)
    this.id = Buffer.from(this.id || EMPTY_BUFFER)
    this.master = Buffer.from(this.master || EMPTY_BUFFER)
    this.key = Buffer.from(this.key || EMPTY_BUFFER)
    this.masterkey = Buffer.from(this.masterkey || EMPTY_BUFFER)
    this.voted = Buffer.from(this.voted || EMPTY_BUFFER)
  }
}

export class Ballot extends Message {
  static register () { registerMessage('Ballot', Ballot) }
  constructor (properties) {
    super(properties)
    this.alpha = Buffer.from(this.alpha || EMPTY_BUFFER)
    this.beta = Buffer.from(this.beta || EMPTY_BUFFER)
  }
}

export class ProjectData extends Message {
  static register () { registerMessage('ProjectData', ProjectData) }

  constructor (properties) {
    super(properties)
    this.datasets = Buffer.from(this.datasets || EMPTY_BUFFER)
  }
}

Transaction.register()
Footer.register()
Election.register()
Ballot.register()
ProjectData.register()