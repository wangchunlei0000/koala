// 确保以画布中心进行旋转
const rotateContext = obj => {
  const { ctx } = obj
  const x = obj.nodeW
  const y = obj.nodeH * 2
  const degree = obj.rotate
  if (degree === 0) {
    return
  }
  ctx.translate(x, y)
  ctx.rotate((degree * Math.PI) / 180)
  ctx.translate(-x, -y)
}

// 获取水印矩形的长，取最大长度
const getRectWidth = (ctx, content) => {
  const widthArr = content.map(item => ctx.measureText(item).width)
  const maxWidth = Math.max.apply(null, widthArr)
  return maxWidth
}

// 获取水印矩形的宽
const getRectHeight = (ctx, content, lineY) => {
  const len = content.length
  const height = ctx.measureText('口').width
  return height * len + lineY * (len - 1)
}

const WATER_NUM = 30

class Watermark {
  constructor(option) {
    this.init(option)
  }

  getWatermarkElement() {
    return this.canvas
  }

  init(option) {
    const {
      watermarkText,
      alpha,
      angle,
      color,
      size,
      waterWidth,
      waterHeight,
      mini,
      offsetX,
      offsetY,
      lineY,
      top,
      left,
    } = option
    this.initCanvas({ waterWidth, waterHeight, top, left })
    this.content = watermarkText.split('/')
    this.opacity = alpha
    this.rotate = angle
    this.color = color
    this.fontSize = mini ? size / mini : size
    this.nodeW = waterWidth
    this.nodeH = waterHeight
    this.mini = mini
    this.offsetX = mini ? offsetX / mini : offsetX
    this.offsetY = mini ? offsetY / mini : offsetY
    this.lineY = mini ? lineY / mini : lineY
    this.ctx = this.canvas.getContext('2d')
    this.render(option)
  }

  initCanvas({ waterWidth, waterHeight, top, left }) {
    const watermarkStyle = {
      width: `${waterWidth}px`,
      height: `${waterHeight}px`,
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      'pointer-events': 'none',
    }
    this.ctx = null
    this.canvas = document.createElement('canvas')
    this.canvas.width = waterWidth
    this.canvas.height = waterHeight
    this.canvas.id = 'watermark-canvas'
    this.canvas.className = 'water-mark-dom'
    Object.assign(this.canvas.style, watermarkStyle)
  }

  render() {
    let unitWidth = ''
    let unitHeight = ''
    const {
      content,
      fontSize,
      ctx,
      color,
      opacity,
      lineY,
      nodeW,
      nodeH,
      rotate,
      offsetY,
      offsetX,
    } = this
    const len = content.length
    if (len === 0) {
      return
    }
    ctx.font = `${fontSize}pt Arial, "PingFangSC-Regular", "microsoft yahei", "微软雅黑", "Hiragino Sans GB", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = color
    ctx.globalAlpha = opacity

    unitWidth = getRectWidth(ctx, content)
    unitHeight = getRectHeight(ctx, content, lineY)

    const singleHeight = ctx.measureText('口').width
    const columnNum = WATER_NUM * 2
    const rowNum = WATER_NUM * 2
    ctx.save()
    const obj = {
      ctx,
      nodeW: nodeW / 2,
      nodeH: nodeH / 2,
      rotate,
    }
    rotateContext(obj)

    for (let i = 0; i < rowNum; i += 1) {
      const y =
        i > WATER_NUM ? (unitHeight + offsetY) * (i - WATER_NUM) * -1 : (unitHeight + offsetY) * i
      for (let j = 0; j < columnNum; j += 1) {
        const x =
          j > WATER_NUM ? (unitWidth + offsetX) * (j - WATER_NUM) * -1 : (unitWidth + offsetX) * j
        for (let index = 0; index < len; index += 1) {
          const txtY = (index + 1) * (singleHeight + lineY + y)
          ctx.fillText(content[index], x, txtY)
        }
      }
    }
    ctx.restore()
  }
}

export { Watermark }
