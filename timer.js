// import schedule from 'node-schedule';
// import Withdraw from './models/withdraw.js'
// import BlockIo from 'block_io';
// let version = 2;
// let block_io = new BlockIo('', '', version);
//
// export const timer = () => {
//     let j = schedule.scheduleJob('* * 59 * * *', function() {
//         block_io.get_balance({}, function(err, btc) {
//
//             let d = new Date;
//             let time = Math.floor(d.getTime(d) / 1000);
//             Withdraw.find({
//                     pos: "p",
//                 }, function(err, withdraw) {
//                     if (err) {
//                         console.log(err)
//                     } else if (withdraw.length == 0) {
//                         console.log("empty")
//                     } else {
//                         for (let i = 0; i < withdraw.length; i++) {
//                             if (parseFloat(btc) - parseFloat(withdraw[i].balance) >= 0.005) {
//                                 block_io.withdraw({
//                                     'amounts': withdraw[i].balance,
//                                     'to_addresses': withdraw[i].address
//                                 }, console.log);
//                                 if (time - parseFloat(withdraw[i].unix) >= 0) {
//                                     if (parseFloat(withdraw[i].balance) <= 0.05) {
//                                         withdraw[i].pos = "n";
//                                         withdraw[i].save(function(err) {
//                                             if (err) {
//                                                 console.log(err)
//                                             } else {}
//                                         })
//                                     }
//                                 }
//                             }
//                         }
//             }
//           })
//         });
//     });
// }
