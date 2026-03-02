const listData = [
  { id: '1', titleKey: 'caseData.1.title', descKey: 'caseData.1.desc', tagKey: 'cases.metallurgy', imageKey: 'case1.h1' },
  { id: '5', titleKey: 'caseData.5.title', descKey: 'caseData.5.desc', tagKey: 'cases.metalRecycle', imageKey: 'case5.automationControl' },
  { id: '2', titleKey: 'caseData.2.title', descKey: 'caseData.2.desc', tagKey: 'cases.nonferrousSmelt', imageKey: 'case2.controlRoom' },
  { id: '3', titleKey: 'caseData.3.title', descKey: 'caseData.3.desc', tagKey: 'cases.hazardousWaste', imageKey: 'case3.panorama' },
  { id: '4', titleKey: 'caseData.4.title', descKey: 'caseData.4.desc', tagKey: 'cases.ecoProtection', imageKey: 'case4.storageArea' },
]

const details = {
  '1': { id: '1' },
  '2': { id: '2' },
  '3': { id: '3' },
  '4': { id: '4' },
  '5': { id: '5' },
}

export const casesMock = {
  async list() {
    return { items: listData }
  },
  async detail(id) {
    const d = details[id]
    if (!d) throw new Error('Not found')
    return d
  },
}

