import Deposit from './models/deposit.js';
import Withdraw from './models/withdraw.js';
import WebSocket from 'ws';
const ws = new WebSocket('wss://n.block.io/');
const roma = {
    "type": "account",
    "api_key": ""
};
import BlockIo from 'block_io';
let version = 2;
let block_io = new BlockIo('', '', version);
let address;

export const socket = () => {
    ws.on('open', function open() {
        ws.send(JSON.stringify(roma));
    });


    ws.on('message', function depos(data, flags) {
         data = JSON.parse(data)
        console.log(data)
        console.log(typeof(data))
        if (data.data != undefined) {
          if (parseFloat(data.data.amount_received) >= 0.001 && parseFloat(data.data.confirmations) >= 1) {
              block_io.get_transactions({
                  'type': 'received'
              }, function(err, info) {
                  let address;
                  for (let i = 0; i < info.data.txs.length; i++) {
                      if (info.data.txs[i].txid == data.data.txid) {
                          address = info.data.txs[i].senders[0]
                      }
                  }
                  Deposit.find({
                      txid: data.data.txid
                  }, function(err, dep) {
                      if (err) {
                          console.log(err)
                      } else if (dep.length == 0) {
                          let d = new Date()
                          let unix = Math.floor(d.getTime() / 1000)
                          console.log(unix)
                          Deposit.create({
                              address: address,
                              txid: data.data.txid,
                              balance: parseFloat(data.data.amount_received),
                              balances: parseFloat(data.data.amount_received) * 2,
                              unix: unix,
                              date: d,
                              status:"Sucess",
                          }, function(err, deposit) {
                              if (err) {
                                  console.log(err)
                              } else {
                                    let  time = parseFloat(unix) + (2 * 86400)
                                  Withdraw.create({
                                      address: address,
                                      balance: parseFloat(data.data.amount_received) * 2,
                                      unix: time,
                                      pos: "p",
                                      status:"Paid",
                                  }, function(err, withdraw) {
                                      if (err) throw err;
                                          User.find({
                                              address: address
                                          }, function(err, user) {
                                              if (err) throw err
                                              if(user[0].refer !=undefined && user.length>0){
                                                Withdraw.create({
                                                  address: user[0].refer,
                                                  balance: (parseFloat(data.data.amount_received) / 100) * 10,
                                                  unix: unix,
                                                  pos: "p",
                                                  refer: "p",
                                                  referal:address,
                                                  status:"Paid",

                                                },function(err,withdraws){
                                                  console.log(withdraws)

                                                })
                                              }
                                          })
                                  })
                              }
                          })
                      }
                  })
              });

          } else if (parseFloat(data.data.amount_sent) > 0) {
              block_io.get_transactions({
                  'type': 'sent'
              }, function(err, info) {
                  let address;
                  for (let i = 0; i < info.data.txs.length; i++) {
                      if (info.data.txs[i].txid == data.data.txid) {
                          res.send(info.data.txs[i].amounts_received[0].recipient);
                          address = info.data.txs[i].amounts_received[0].recipient
                      }
                  }
                  Withdraw.find({
                      pos: "n",
                      address: address,
                      balance: parseFloat(data.data.amount_sent)
                  }, function(err, withdraw) {
                      if (err) throw err;
                      withdraw[0].txid = data.data.txid;
                      withdraw[0].date = new Date()
                      withdraw[0].save(function(err) {
                          if (err) throw err
                      })
                  })
              })
          }

        }

    });
}

function depos(data) {
    console.log(data)
    console.log(typeof(data))
    return
        // if (parseFloat(data.data.amount_received) >= 0.0009 && parseFloat(data.data.confirmations) >= 1) {
        //     block_io.get_transactions({
        //         'type': 'received'
        //     }, function(err, info) {
        //         let address;
        //         for (let i = 0; i < info.data.txs.length; i++) {
        //             if (info.data.txs[i].txid == data.data.txid) {
        //                 address = info.data.txs[i].senders[0]
        //             }
        //         }
        //         Deposit.find({
        //             txid: data.data.txid
        //         }, function(err, dep) {
        //             if (err) {
        //                 console.log(err)
        //             } else if (dep.length == 0) {
        //                 let d = new Date()
        //                 let unix = Math.floor(d.getTime() / 1000)
        //                 console.log(unix)
        //                 Deposit.create({
        //                     address: address,
        //                     txid: data.data.txid,
        //                     balance: parseFloat(data.data.amount_received),
        //                     balances: parseFloat(data.data.amount_received) * 2,
        //                     unix: unix,
        //                     date: d,
        //                     status:"Success",
        //                     fake:"n"
        //                 }, function(err, deposit) {
        //                     if (err) {
        //                         console.log(err)
        //                     } else {
        //                             time = parseFloat(unix) + (2 * 86400)
        //                         Withdraw.create({
        //                             address: address,
        //                             balance: parseFloat(data.data.amount_received) * 2,
        //                             unix: time,
        //                             pos: "p",
        //                             status:"Paid",
        //                             fake:"n"
        //                         }, function(err, withdraw) {
        //                             if (err) throw err;
        //                                 User.find({
        //                                     address: address
        //                                 }, function(err, user) {
        //                                     if (err) throw err
        //                                     if(user[0].refer !=undefined && user.length>0){
        //                                       Withdraw.create({
        //                                         address: user[0].refer,
        //                                         balance: (parseFloat(data.data.amount_received) / 100) * 10,
        //                                         unix: unix,
        //                                         pos: "p",
        //                                         refer: "p",
        //                                         referal:address,
        //                                         status:"Paid",
        //                                         fake:"n"
        //
        //                                       },function(err,withdraws){
        //                                         console.log(withdraws)
        //
        //                                       })
        //                                     }
        //                                 })
        //                         })
        //                     }
        //                 })
        //             }
        //         })
        //     });
        //
        // } else if (parseFloat(data.data.amount_sent) > 0) {
        //     block_io.get_transactions({
        //         'type': 'sent'
        //     }, function(err, info) {
        //         let address;
        //         for (let i = 0; i < info.data.txs.length; i++) {
        //             if (info.data.txs[i].txid == data.data.txid) {
        //                 res.send(info.data.txs[i].amounts_received[0].recipient);
        //                 address = info.data.txs[i].amounts_received[0].recipient
        //             }
        //         }
        //         Withdraw.find({
        //             pos: "n",
        //             address: address,
        //             balance: parseFloat(data.data.amount_sent)
        //         }, function(err, withdraw) {
        //             if (err) throw err;
        //             withdraw[0].txid = data.data.txid;
        //             withdraw[0].date = new Date()
        //             withdraw[0].save(function(err) {
        //                 if (err) throw err
        //             })
        //         })
        //     })
        // }

}
