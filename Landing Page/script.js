function checkCashRegister(price, cash, cid) {
  let changed = cash - price;
  let output = {
      status: '',
      change: []
  };
  var denomination = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
  
  var registerTotal = cid.reduce((sum, val) => {
    return sum + val[1]; 
  },0);
  
  registerTotal =  Math.round(registerTotal * 100) / 100;
  
  if(registerTotal === changed) {
      output.status = 'CLOSED';
      output.change = cid;
      return output;   
  }
  
  if(registerTotal < changed) {
      output.status = 'INSUFFICIENT_FUNDS';
      return output;
  }
  
  if(registerTotal > changed) {
      let value = 0;
      
      for(let i = denomination.length-1; i >= 0; i--) {
          while(changed >= denomination[i]) {
              if(cid[i][1] !== 0) {
                  changed -= denomination[i];
                  cid[i][1] -= denomination[i];
                  value += denomination[i];
              }
          }
        if(value > 0) {
            output.change.push([cid[i][0], value]);
            value = 0;
        }
      }
    output.status = 'OPEN';
    return output;
  }
}

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])