export class GlobalEvent {
  private clickKeyTarget: EventTarget
  private closeTarget: EventTarget
  private inputTarget: EventTarget
  private candidateListTarget: EventTarget
  private prvKeyTarget: EventTarget
  private nextKeyTarget: EventTarget

  private backSpaceKeyTarget: EventTarget
  private caplockKeyTarget: EventTarget
  private enterKeyTarget: EventTarget
  private deleteKeyTarget: EventTarget
  private shiftKeyTarget: EventTarget

  constructor() {
    this.clickKeyTarget = new EventTarget()
    this.closeTarget = new EventTarget()
    this.inputTarget = new EventTarget()
    this.candidateListTarget = new EventTarget()
    this.prvKeyTarget = new EventTarget()
    this.nextKeyTarget = new EventTarget()

    this.backSpaceKeyTarget = new EventTarget()
    this.caplockKeyTarget = new EventTarget()
    this.enterKeyTarget = new EventTarget()
    this.deleteKeyTarget = new EventTarget()
    this.shiftKeyTarget = new EventTarget()
  }

  getClickKeyTarget() {
    return this.clickKeyTarget
  }
  getCloseTarget() {
    return this.closeTarget
  }
  getInputTarget() {
    return this.inputTarget
  }
  getCandidateListTarget() {
    return this.candidateListTarget
  }
  getPrvKeyTarget() {
    return this.prvKeyTarget
  }
  getNextKeyTarget() {
    return this.nextKeyTarget
  }

  getBackSpaceKeyTarget() {
    return this.backSpaceKeyTarget
  }
  getEnterKeyTarget() {
    return this.enterKeyTarget
  }
  getCaplockKeyTarget() {
    return this.caplockKeyTarget
  }
  getDeleteKeyTarget() {
    return this.deleteKeyTarget
  }
  getShiftKeyTarget() {
    return this.shiftKeyTarget
  }
}
