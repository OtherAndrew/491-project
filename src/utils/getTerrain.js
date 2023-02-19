

const getTerrain = (entityManager) => {

    let noiseMap = []
    let terrainMap = []
    let spawnMap = []
    let airPockets = []
    //Sets numerical value ranges to blocks so we can map them to the terrainMap
        // Ranges from 0 to 10 ish
    let blockValues = {
        CHUNK_0: [
            'copper',
            'coal',
            'coal',
            'null',
            'stone',
            'sand',
            'sand',
            'dirt',
            'null',
            'dirt',
            'dirt'
        ],
        CHUNK_1: [
            'cobalt',
            'copper',
            'copper',
            'coal',
            'stone',
            'stone',
            'dirt',
            'dirt',
            'null',
            'null',
            'null'
        ],
        CHUNK_2: [
            'iron',
            'silica',
            'cobalt',
            'copper',
            'stone',
            'stone',
            'dirt',
            'null',
            'null',
            'null',
            'null'
        ],
        CHUNK_3: [
            'bismuth',
            'tin',
            'iron',
            'silica',
            'stone',
            'stone',
            'null',
            'null',
            'null',
            'null',
            'null'
        ],
        CHUNK_4: [
            'tungsten',
            'bismuth',
            'tin',
            'iron',
            'stone',
            'stone',
            'null',
            'null',
            'null',
            'null',
            'null',
            'gold'
        ],
        CHUNK_5: [
            'titanite',
            'tungsten',
            'tin',
            'coal',
            'stone',
            'stone',
            'null',
            'null',
            'null',
            'null',
            'null'
        ],
        CHUNK_6: [
            'gold',
            'titanite',
            'iron',
            'ferrite',
            'stone',
            'stone',
            'null',
            'null',
            'null',
            'null',
            'null'
        ],
        CHUNK_7: [
            'titanite',
            'ruby',
            'tungsten',
            'coal',
            'stone',
            'stone',
            'null',
            'null',
            'null',
            'null',
            'null'
        ],
        CHUNK_8: [
            'gold',
            'paraffin',
            'silica',
            'titanite',
            'stone',
            'stone',
            'null',
            'null',
            'null',
            'null',
            'null'
        ],
        CHUNK_9: [
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock',
            'bedrock'
        ]

    }
    let blocksPerChunk = 23
    let startRow = 226

        /**
     * Private class function. Generates a (2*gridSize) * (2*gridSize) matrix of perlin noise values
     * The values are from -1 to 1 so it is modified by multiplying by valueOffset and adding valueAddition
     * so it can be easy to work with.
     * Range from 0 to 120 ish.
     */
        function generateNoiseMap() {
            let valueOffset = 10
            let valueAdditional = 5
            for(let y = 0; y < GRIDSIZE; y += 1/GRIDSIZE) {
                let row = []
                for(let x = 0; x < GRIDSIZE; x += 1/GRIDSIZE) {
                    let v = parseInt(perlin.get(x,y) * valueOffset + valueAdditional)
                    row.push(v)
                }
                noiseMap.push(row)
                row = []
            }
        }


         /**
     * Private class function. Uses a noiseMap to place blocks according to the blockValues.
     * 
     */
    function generateTerrain() {
        //fill first half of terrainmap matrix with empty air cells
        for(let i = 0; i < noiseMap.length; i++) {
            let r = []
            for(let j = 0; j < noiseMap.length; j++) {
                r.push({
                    tag: 'air',
                    id: null
                })
            }
            terrainMap.push(r)
        }
        let sizeSoFar = terrainMap[0].length
        noiseMap.forEach( (row, y) => {
            y += sizeSoFar
            let r = []
            row.forEach((val, x) => {
                let e = createBlock({
                    x: x * BLOCKSIZE,
                    y: y * BLOCKSIZE,
                    row: y,
                    value: val
                })
                r.push({
                    tag: e.tag,
                    id: e.id
                })
            })
            terrainMap.push(r)
        })
    }

    function generateSpawnLocations() {
        let yOffset = 5
        //generate surface level locations
        for(let i = WIDTH/BLOCKSIZE; i < terrainMap.length/2 - 2; i += WIDTH/BLOCKSIZE) {
            spawnMap.push({x: i, y: startRow - yOffset})
        }
        //generate cave spawn locations
        for(let currentChunk = startRow + 2 * blocksPerChunk; currentChunk < terrainMap.length; currentChunk += blocksPerChunk) {
            for(let i = WIDTH/BLOCKSIZE; i < terrainMap.length/2 - 2; i += WIDTH/BLOCKSIZE) {
                spawnMap.push({x: i, y: currentChunk})
            }
        }
    }
    function prepareListForDFS() {
        let adjMap = new Map()
        for(let i = startRow + blocksPerChunk; i < terrainMap.length; i++) {
            for(let j = 0; j < terrainMap[i].length; j++) {
                if(terrainMap[i][j].tag === 'air') {
                    let key = JSON.stringify({x:i,y:j})
                    if(!adjMap.has(key)) {
                        let obj = {
                            marked: false,
                            vertices: []
                        }
                        // check four directions for connected air blocks
                        if(terrainMap[clamp(i - 1,startRow + blocksPerChunk,terrainMap.length-1)][j].tag === 'air') {
                            obj.vertices.push(JSON.stringify({x:i-1, y: j}))
                        }
                        if(terrainMap[clamp(i + 1,0,terrainMap.length-1)][j].tag === 'air') {
                            obj.vertices.push(JSON.stringify({x:i+1, y: j}))
                        }
                        if(terrainMap[i][clamp(j - 1,0,terrainMap[0].length-1)].tag === 'air') {
                            obj.vertices.push(JSON.stringify({x:i, y: j -1}))
                        }
                        if(terrainMap[i][clamp(j+1,0,terrainMap[0].length-1)].tag === 'air') {
                            obj.vertices.push(JSON.stringify({x:i, y: j +1}))
                        }
                        adjMap.set(key, obj)
                    }
                }
            }
        }
        generateAirPockets(adjMap)
    }
    function generateAirPockets(adjMap) {
        adjMap.forEach((val, key) => {
            if(!val.marked) {
                val.marked = true
                let size = modifiedDFS(adjMap, val)
                airPockets.push(size)
            }
        })
        airPockets = airPockets.sort((a,b) => b - a)
        console.log(airPockets)
    }

    function modifiedDFS(adjMap, val) {
        let size = 1
        val.vertices.forEach(key => {
            let obj = adjMap.get(key)
            if(obj && !obj.marked) {
                obj.marked = true
                size += modifiedDFS(adjMap, obj)
            }
        })
        return size
    }

    /**
     * Creates a tile entity according to the noise value 
     * @param {*} props 
     * @returns 
     */
    function createBlock(props) {
        let value = clamp(props.value, 0, 10)
        let index = blockValues['CHUNK_'+ Math.floor((props.row - startRow) / blocksPerChunk)][value]
        if(index === 'null') {
            return {tag: 'air', id: null}
        }
        let block = 'tile_' + index
        return entityManager.addEntity(generateBlock(block, props.x, props.y, 'terraingen'));
    }



    function generateBackgrounds() {
        let surfaceBackWidth = 512
        let surfaceBackHeight = 240
        let undergroundWidth = 384
        let undergroundHeight = 216
        let scale = 2
        let scaleUnder = 6
        let caveBGYVal = HEIGHT_PIXELS - (undergroundHeight * scaleUnder) - HEIGHT * .5
        let offset = BLOCKSIZE * 2

        for(let i = 0; i < 2; i++) {

            entityManager.addEntity({
                tag: 'background_0',
                components: [
                    new CTransform({
                        x: (surfaceBackWidth * i * scale),
                        y: (-surfaceBackHeight * scale) + HEIGHT_PIXELS * .5 + offset,
                        maxVelocity: 0
                    }),
                    new CSprite({
                        sprite: ASSET_MANAGER.cache[BG_PATH.SURFACE_0],
                        sWidth: surfaceBackWidth,
                        sHeight: surfaceBackHeight,
                        scale: scale,
                    })
                ]
            })
            entityManager.addEntity({
                tag: 'background_0',
                components: [
                    new CTransform({
                        x: (1920 * i * 1),
                        y:  HEIGHT_PIXELS * .5 + (1080 * 1),
                        maxVelocity: 0
                    }),
                    new CSprite({
                        sprite: ASSET_MANAGER.cache[BG_PATH.DIRT],
                        sWidth: 960,
                        sHeight: 540,
                        scale: 2,
                    })
                ]
            })
            entityManager.addEntity({
                tag: 'background_1',
                components: [
                    new CTransform({
                        x: (surfaceBackWidth * i * scale),
                        y: (-surfaceBackHeight * scale) + HEIGHT_PIXELS * .5 + offset,
                        maxVelocity: 0
                    }),
                    new CSprite({
                        sprite: ASSET_MANAGER.cache[BG_PATH.SURFACE_1],
                        sWidth: surfaceBackWidth,
                        sHeight: surfaceBackHeight,
                        scale: scale,
                    })
                ]
            })
            entityManager.addEntity({
                tag: 'background_3',
                components: [
                    new CTransform({
                        x: (undergroundWidth * i * scaleUnder),
                        y:  caveBGYVal,
                        maxVelocity: 0
                    }),
                    new CSprite({
                        sprite: ASSET_MANAGER.cache[BG_PATH.UNDERGROUND_3],
                        sWidth: undergroundWidth,
                        sHeight: undergroundHeight,
                        scale: scaleUnder,
                    })
                ]
            })
            
            entityManager.addEntity({
                tag: 'background_4',
                components: [
                    new CTransform({
                        x: (undergroundWidth * i * scaleUnder),
                        y:  caveBGYVal,
                        maxVelocity: 0
                    }),
                    new CSprite({
                        sprite: ASSET_MANAGER.cache[BG_PATH.UNDERGROUND_4],
                        sWidth: undergroundWidth,
                        sHeight: undergroundHeight,
                        scale: scaleUnder,
                    })
                ]
            })
        }
    }
    function generateBorders() {
        // left border collider
        entityManager.addEntity({
            tag: 'tile_bedrock',
            components: [
                new CTransform({
                    x: 0,
                    y: 0
                }),
                new CBoxCollider({
                    x: 0,
                    y: 0,
                    width: WIDTH * .5,
                    height: HEIGHT_PIXELS
                })
            ]
        })

        // right border collider
        entityManager.addEntity({
            tag: 'tile_bedrock',
            components: [
                new CTransform({
                    x: WIDTH_PIXELS - (WIDTH * .5),
                    y: 0
                }),
                new CBoxCollider({
                    x: WIDTH_PIXELS - (WIDTH * .5),
                    y: 0,
                    width: WIDTH * .5,
                    height: HEIGHT_PIXELS
                })
            ]
        })

        //top
        entityManager.addEntity({
            tag: 'tile_bedrock',
            components: [
                new CTransform({
                    x: 0,
                    y: 0
                }),
                new CBoxCollider({
                    x: 0,
                    y: 0,
                    width: WIDTH_PIXELS,
                    height: HEIGHT * .5
                })
            ]
        })
    }

    function generateStatues() {
        for(let r = 0; r < 3; r++) {
            let pos = chooseRandomLocation(6,7)
            let pos2 = {}
            pos2.x = pos.x * BLOCKSIZE
            pos2.y = pos.y * BLOCKSIZE
           let e = entityManager.addEntity({
                tag: 'chozo',
                components: [
                    new CTransform({
                        x: pos2.x,
                        y: pos2.y,
                        hasGravity: true
                    }),
                    new CSprite({
                        sprite: ASSET_MANAGER.cache[ENV_PATH.CHOZO_STATUE],
                        sWidth: 64,
                        sHeight: 64,
                        scale: 3,
                    })
                ]
            })
            for(let i = 0, j = 0; i < 6 * BLOCKSIZE; i += BLOCKSIZE) {
                let e = entityManager.addEntity(generateBlock('tile_bedrock', pos2.x + i, pos2.y + (BLOCKSIZE * 6), 'terraingen'))
                terrainMap[pos.y + 6][pos.x + j++] = {
                    tag: e.tag,
                    id: e.id
                }
                
            }
        }
        
    }
    function chooseRandomLocation(width, height) {
        entityManager.update()
        let x = clamp(randomInt(terrainMap[0].length), 16, terrainMap[0].length - width -1)
        let y = clamp(randomInt(terrainMap.length) + startRow, 333, terrainMap.length - height - 20)
        console.log(x, y)
        for(let i = y; i < y + height; i++) {
            for(let j = x; j < x + width; j++) {
                let cell = terrainMap[i][j]
                if(cell.tag !== 'air') {
                    let e =entityManager.getEntity(cell.id)
                e.destroy()
                terrainMap[i][j] = {tag: 'air', id: null}
                }
            }
        }
        entityManager.update()
        return {x:x,y:y}
    }

    generateBackgrounds()
    generateNoiseMap()
    generateTerrain()
    generateBorders()
    generateSpawnLocations()
    generateStatues()
    //prepareListForDFS()
    return [terrainMap, spawnMap]

}