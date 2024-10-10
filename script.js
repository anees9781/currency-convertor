const BASE_URL =
 "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";;
const dropDowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button")
let fromCur = document.querySelector(".from select")
let toCur = document.querySelector(".TO select")

for(select of dropDowns ){
    for(currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText =currCode;
        newOption.value =currCode;
        if(select.name ==="from" &&currCode ==="USD" ){
            newOption.selected ="selected"
        }
        else if(select.name ==="to" &&currCode ==="PKR" ){
            newOption.selected ="selected"
        }
        select.append(newOption)

    }  
    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}

const updateFlag =(element)=>{
    let currCode =element.value;
    let countryCode =countryList[currCode];
    let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`
    let img= element.parentElement.querySelector("img");
    img.src =newSrc;
}
btn.addEventListener("click", async(evt) =>{
    evt.preventDefault();
    let amount =document.querySelector(".amount input")
    let amtVal =amount.value;
    
    if(amtVal ==="" || amtVal <1){
        amtVal ==1;
        amount.value= "1"
    }
    console.log(fromCur.value ,toCur.value)
    const URL =`${BASE_URL}/${fromCur.value.toLowerCase}/${toCur.value.toLowerCase}.json`
    let response =await fetch(URL)
    let data = await response.json()
    let rate = data[(toCur.value.toLowerCase)]
    let finalAmount = rate * amtVal;
    let msg =document.querySelector(".message")
    msg.innerText =`${amtVal}${fromCur.value} = ${finalAmount }${toCur.value}`
})
