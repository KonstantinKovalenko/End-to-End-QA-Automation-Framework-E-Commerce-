export function parsePrice (priceInput: string){
    if(priceInput.length === 0){
        throw new Error(`parsePrice: no text found in input variable`)
    }
    const resultPrice = priceInput.match(/\d+(\.\d+)?/)
    if(!resultPrice){
        throw new Error (`parsePrice: no price found in ${priceInput}`)
    }
    return parseFloat(resultPrice[0])
}

export function splitText (text: string){
    return text.trim().split(/\s+/)
}