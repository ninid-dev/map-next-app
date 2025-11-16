export const TITLE_REQUEST_LIST = [
  {
    label: 'น้ำท่วม',
    value: 'flood'
  },
  {
    label: 'ไฟไหม้',
    value: 'fire'
  },
  {
    label: 'อุบัติเหตุ',
    value: 'accident'
  },
  {
    label: 'ขอของยังชีพ',
    value: 'relief_request'
  },
  {
    label: 'ผู้ป่วยฉุกเฉิน',
    value: 'emergency_patient'
  },
]

export const REQUEST_STATUS = {
  'PENDING': {
    label: 'รอดำเนินงาน',
    color: '#FAAD14',
    textColor: '#EFEFEF'
  },
  'PROGRESS': {
    label: 'กำลังดำเนินงาน',
    color: '#CD6200',
    textColor: '#EFEFEF'
  },
  'COMPLETED': {
    label: 'เสร็จสิ้น',
    color: '#52C41A',
    textColor: '#EFEFEF'
  },
  'CANCEL': {
    label: 'ยกเลิก',
    color: '#636363',
    textColor: '#EFEFEF'
  },
}
