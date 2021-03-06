const canvas1 = document.querySelector('#shuye')
const c = canvas1.getContext('2d')

canvas1.width = innerWidth
canvas1.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

// Event Listeners
addEventListener('mousedown', () => {
    tree.beginLoop = false
    TweenLite.to(tree.branch, 1, {
        x: 0,
        y: 0,
        ease: Power4.easeInOut
    })
})

addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('mouseup', () => {
    tree.beginLoop = true
})

addEventListener('resize', () => {
    canvas1.width = innerWidth
    canvas1.height = innerHeight

    init()
})

// Utility Functions
function drawBranch(l, branchAngle, branchWidth, x, y) {
    // Make longer branches wider
    c.fillRect(x, y, branchWidth, -l)
    c.save()
    c.translate(0, -l)

    if (l > 1) {
        // Start at -80 degrees
        let angle = -Math.PI * 4 / 9
        // Draw three branches
        for (let i = 0; i < 3; i++) {
            // The length of our new branches
            let length2 = l * 0.47

            // Make the middle branch bigger
            if (i == 1) length2 = length2 + 0.3 * l

            c.save()
            c.rotate(angle)
            drawBranch(length2, branchAngle, branchWidth, x, y)
            c.restore()

            // Add 90 degrees for the next branch
            angle = angle + branchAngle
        }
    }
    c.restore()
}

// Objects
function Tree(x, y, color) {
    this.x = x
    this.y = y
    this.color = color
    this.branch = {
        x: 200,
        y: 200,
        length: 30,
        width: 1,
        angle: Math.PI / 2
    }
    this.hasInitialized = false
    this.beginLoop = false
    this.lastMouse = {
        x: mouse.x,
        y: mouse.y
    }
    this.hue = 255
}

Tree.prototype.draw = function() {
    c.fillStyle = `hsl( ${this.hue}, 76%, 81%)`
    c.save()
    c.translate(this.x, this.y)
    drawBranch(
        this.branch.length,
        this.branch.angle,
        this.branch.width,
        this.branch.x,
        this.branch.y
    )
    c.restore()
}

Tree.prototype.update = function(ticker) {
    this.draw()

    if (this.beginLoop === true) {
        this.branch.x = this.branch.x + Math.cos(ticker)
        this.branch.y = this.branch.y + Math.sin(ticker)
    }

    this.hue = Math.abs(255 * Math.sin(ticker * 0.5))

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.01
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.01

    this.x = this.lastMouse.x
    this.y = this.lastMouse.y + 55
}

// Implementation
let tree
function init() {
    tree = new Tree(canvas1.width / 2, canvas1.height / 2 + 40, 'green')
}

// Animation Loop
let ticker = 0
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas1.width, canvas1.height)

    tree.update(ticker)
    ticker += 0.01

    if (tree.hasInitialized === false) {
        tree.hasInitialized = true
        TweenLite.to(tree.branch, 1.5, {
            x: 0,
            y: 0,
            ease: Power4.easeInOut
        })

        setTimeout(() => {
            tree.beginLoop = true
        }, 1900)
    }
}

init()
animate()