let balance=document.getElementById('curr-balance');
let curr_income=document.getElementById('curr-income');
let currExpense=document.getElementById('curr-expense');
let inputText=document.getElementById('input-text');
let inputAmount=document.getElementById('input-amount');
let submitBtn=document.getElementById('submit-btn');
let transactionList=document.getElementById('transaction-list');



let transactionArray=localStorage.getItem("transactions")!==null?JSON.parse(localStorage.getItem("transactions")):[];

init();

function init(){
    transactionList.innerHTML="";
    transactionArray.forEach(addTransactionDOM);
    updateValues();
}


function addTransaction(e){
    e.preventDefault();
    if(inputText.value.trim() === '' || inputAmount.value.trim() === ''){
      alert('please add text and amount')
    }else{
        const transaction={
            id:generateId(),
            text:inputText.value,
            amount:inputAmount.value,
        }
        transactionArray.push(transaction);
        //console.log(transactionArray);
        addTransactionDOM(transaction);
        inputText.value="";
        inputAmount.value="";
        
        updateLocalStorage();
        updateValues();

    }
  }


function addTransactionDOM(transaction){

    const item=document.createElement("li");
    item.innerHTML=`
                            <span class="message">${transaction.text}</span>
                            <span>
                                <span >${transaction.amount}</span>
                                <span class="close" onclick="removeTransaction(${transaction.id})">&#x2717;</span>
                            </span>
                `;
                transactionList.appendChild(item);
}

function removeTransaction(id){
    transactionArray=transactionArray.filter(transaction=>transaction.id!==id);
    updateLocalStorage();
    init();
}

function updateLocalStorage(){
    localStorage.setItem("transactions",JSON.stringify(transactionArray));
}

function updateValues(){
    const amounts=transactionArray.map((transaction)=>Number(transaction.amount));
    const total=amounts.reduce((acc,item)=>acc+=item,0);
    const incomes=amounts.filter((item)=>item>0)
                    .reduce((acc,item)=>acc+=item,0);
    const exp=amounts.filter((item)=>item<0)
    .reduce((acc,item)=>acc+=Math.abs(item),0);

    balance.innerText=`$${total}`;
    curr_income.innerText=`$${incomes}`;
    currExpense.innerText=`$${exp}`;
}

function generateId(){
    return Math.floor(Math.random()*1000000);
}


submitBtn.addEventListener('click',addTransaction);

