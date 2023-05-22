const bcrypt = require('bcrypt')
const f = async()=>{
    const hash = await bcrypt.hash('qwerty',10)
    return hash
}

const d = f().then(res=>console.log(res))
