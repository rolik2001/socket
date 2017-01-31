import schedule from 'node-schedule';
import Deposit from './models/deposit.js'
import BlockIo from 'block_io';
let version = 2;
let block_io = new BlockIo('1735-54e8-8c3e-0243', '20102010', version);

export const timers = () => {
  let j = schedule.scheduleJob('* * 12 * * *', function() {
    let d = new Date();
    let unix = d.getTime
    Deposit.create({
        fake:""
    }, function(err, deposit) {
        if (err) {
            console.log(err)
        } else {
        console.log("GOOD")
      }
});


})
}
