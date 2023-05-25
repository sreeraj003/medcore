const num = 1248

const numstr = num.toString()
let count=0
for(i=0;i<numstr.length;i++){
    if(num%parseInt(numstr[i])==0){
        count++
        
    }
}

return count