const balance = document.querySelector(".balance-card p");

const income = document.querySelector(".income-card p");

const expense = document.querySelector(".expense-card p");

const form = document.getElementById("transaction-form");

const amount = document.querySelector("#amount");

const description = document.querySelector("#description");

const category = document.querySelector("#category");

const date = document.querySelector("#date");

const transactionHistory = document.querySelector(".transaction-history");

const noTransactionMessage = document.querySelector(".history-card p");

const descriptionGroup = document.querySelector(".description-group");
const categoryGroup= document.querySelector(".category-group");

let totalIncome = 0;
let totalExpense= 0;
let totalBalance = 0;

let transactions=[];
const savedTransactions=localStorage.getItem("transactions");

if (savedTransactions){
    transactions=JSON.parse(savedTransactions);

}
transactions.forEach(renderTransaction);
updateSummary();


const incomeRadio=document.getElementById("income");
const expenseRadio=document.getElementById("expense");

incomeRadio.addEventListener("change",function(){
    descriptionGroup.style.display="none";
    categoryGroup.style.display= "none";

    description.required=false;
    category.required=false;
});

expenseRadio.addEventListener("change",function(){
    descriptionGroup.style.display="block";
    categoryGroup.style.display="block";

    description.required=true;
    category.required=true;
});

function renderTransaction(transaction){
    const transactionDiv = document.createElement("div");
    transactionDiv.classList.add("transaction-item")

   

    const typeValue=transaction.type;
    const amountValue=transaction.amount;
    const descriptionValue=transaction.description;
    const categoryValue =transaction.category;
    const dateValue=transaction.date;

    if(typeValue==="income"){
    transactionDiv.classList.add("income-item");
    }else{
        transactionDiv.classList.add("expense-item");
    }

    let amountDisplay;



    if (typeValue==="income"){
       amountDisplay = `+ ₹${amountValue}`;
    }else{
        amountDisplay = `- ₹${amountValue}`;
        
    };

    const [year, month, day] = dateValue.split("-");
    const formattedDate = `${day}/${month}/${year}`;

    if(typeValue === "income"){
    transactionDiv.innerHTML = `
        <p>Date: ${formattedDate}</p>
        <p>Amount: ${amountDisplay}</p>
    `;
    }else{
    transactionDiv.innerHTML = `
        <p>Description: ${descriptionValue}</p>
        <p>Category: ${categoryValue}</p>
        <p>Date: ${formattedDate}</p>
        <p>Amount: ${amountDisplay}</p>
    `;
}
    const deleteButton = document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.classList.add("delete-btn");



    deleteButton.addEventListener("click",function(){
        transactions=transactions.filter(function(item){
            return item.id !==transaction.id;
        })
        localStorage.setItem("transactions",JSON.stringify(transactions));
        transactionDiv.remove();

        updateSummary();
        
    })
    

    transactionDiv.appendChild(deleteButton);
    transactionHistory.appendChild(transactionDiv);

}

function updateSummary(){
    totalIncome=0;
    totalExpense=0;
    totalBalance=0;

    transactions.forEach(function(transaction){
        if (transaction.type==="income"){
            totalIncome+=transaction.amount;
        }else{
            totalExpense+=transaction.amount;
        }
    });
    totalBalance=totalIncome-totalExpense

    income.textContent = `₹${totalIncome}`;
    expense.textContent = `₹${totalExpense}`;
    balance.textContent = `₹${totalBalance}`;    

}


form.addEventListener("submit", function(event){
    event.preventDefault();




    const amountValue= parseFloat(amount.value);
    const descriptionValue=description.value;
    const categoryValue = category.value;
    const dateValue = date.value;

    const type = document.querySelector('input[name="type"]:checked')
    const typeValue= type.value;


    const transaction={
        id:Date.now(),
        type:typeValue,
        amount:amountValue,
        description : descriptionValue,
        category: categoryValue,
        date: dateValue,
    }

    transactions.push(transaction);
    renderTransaction(transaction);
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateSummary();

    // let amountDisplay;
    // // if (typeValue==="income"){
    // //     // amountDisplay = `+ ₹${amountValue}`;
    // //     totalIncome+= amountValue;
    // // }else{
    // //     // amountDisplay = `- ₹${amountValue}`;
    // //     totalExpense += amountValue;
    // // };
    // // totalBalance = totalIncome - totalExpense;

   

    // income.textContent = `₹${totalIncome}`;
    // expense.textContent = `₹${totalExpense}`;
    // balance.textContent= `₹${totalBalance}`;

  

    // const deleteButton = document.createElement("button");
    // deleteButton.textContent="Delete";
    // deleteButton.classList.add("delete-btn");

    // deleteButton.addEventListener("click" , function(){
    //     if (typeValue==="income"){
    //         totalIncome-=amountValue;

    //     }else{
    //         totalExpense-=amountValue;
    //     }
    //     totalBalance = totalIncome-totalExpense;
    //     income.textContent=`₹${totalIncome}`;
    //     expense.textContent=`₹${totalExpense}`;
    //     balance.textContent=`₹${totalBalance}`;
    //     transactionDiv.remove();

    // });

   
    

    // const [year,month,day]=dateValue.split("-");
    // const formattedDate =`${day}/${month}/${year}`;
    
    // if(typeValue==="income"){
       
    //     transactionDiv.innerHTML=`
    //     <p>Date: ${formattedDate}</p>
    //     <p>Amount: ${amountDisplay}</p>
    //     `
    // }else{
        
    //     transactionDiv.innerHTML=`
    //     <p>Description:${descriptionValue}</p>
    //     <p>Category: ${categoryValue}</p>
    //     <p>Date: ${formattedDate}</p>
    //     <p>Amount: ${amountDisplay}</p>`

    // }

    // if(typeValue==="income"){
    //     transactionDiv.classList.add("income-item");
    // }else{
    //     transactionDiv.classList.add("expense-item");
    // }
    
    // transactionDiv.appendChild(deleteButton);
    // transactionHistory.appendChild(transactionDiv);

    noTransactionMessage.style.display="none";
    form.reset();


    

});


