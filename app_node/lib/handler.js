const { phoneNumberFormatter } = require('./formatter');
const request = require('request');
const { text } = require('express');

module.exports = function (chika, chatUpdate, db, m, datetime) {
    const mek = chatUpdate
    const text = m.body
    const sender = mek.key.remoteJid
    const mynumb = chika.decodeJid(chika.user.id).replace(/\D/g, '')
    const devices = chika.decodeJid(chika.user.id).replace(/\D/g, '').replace('@s.whatsapp.net', '')
    const receiver = chika.decodeJid(sender).replace(/\D/g, '').replace('@s.whatsapp.net', '')
    let today = new Date();
    let timedate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    let sqlautoreply = `SELECT * FROM autoreply WHERE keyword = "${text}" AND nomor = "${mynumb}"`;

    // DB Query to add message into table receive_chat
    if(!mek.key.fromMe) { // cek apakah tipe pesan merupakan receive / sender

        // setup data payloads terkait pesan terima yang akan disimpan
        const payloads = {
            msg_id: m.key.id,
            participant: receiver,
            msg: m.body,
            mynumb: devices,
            fromMe: (+mek.key.fromMe).toString(),
            times: m.messageTimestamp
        }
        
        // query native untuk melakukan penyimpanan data pesan ke table receive_chat
        let addReceiveMessages = 'INSERT INTO `receive_chat` (`id_pesan`, `nomor`, `pesan`, `from_me`, `nomor_saya`, `tanggal`) values'
        + "('{msg_id}', '{participant}', '{msg}', '{fromMe}', '{mynumb}', FROM_UNIXTIME({times}));"

        // remapping data query native terhadap data payloads
        addReceiveMessages = addReceiveMessages.replace(/(\{)+([A-Za-z_-])+(\})/g, r => payloads[r.replace(/[^A-Za-z_-]/g, '')])

        // execute query
        db.query(addReceiveMessages, function (err, result) {
            if(err) {
                console.log('IF Error >>>', err)
            }
            console.log('Results', result)
        })
    }
    

    db.query(sqlautoreply, function (err, result) {
        if (!err) {
            result.forEach(data => {
                console.log('send autoreply ke ' + sender)
                switch (data.type) {
                    case "Text":
                        chika.sendMessage(sender, { text: data.response }).then(response => {
                            db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${data.response}', '', '', '', '', '', '', '', '', 'Sent', 'received', '${timedate}')`)
                        }).catch(err => {
                            db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${data.response}', '', '', '', '', '', '', '', '', 'Failed', 'received', '${timedate}')`)
                        });
                        break
                    case "Text & Media":
                        var media = `${data.media}`;
                        const ress = data.response
                        const array = media.split(".");
                        const ext = array[array.length - 1];
                        if (ext == 'jpg' || ext == 'png' || ext == 'jpeg') {
                            chika.sendMessage(sender, { image: { url: `${media}` }, caption: `${ress}` }).then(response => {
                                db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${ress}', '${media}', '', '', '', '', '', '', '', 'Sent', 'received', '${timedate}')`)
                            }).catch(err => {
                                db.query(`INSERT INTO 'reports' ('id', 'device', 'receiver', 'message', 'media', 'footer', 'btn1', 'btn2', 'btn3', 'btnid1', 'btnid2', 'btnid3', 'status', 'type', 'created_at') VALUES (NULL, '${devices}', '${receiver}', '${ress}', '${media}', '', '', '', '', '', '', '', 'Failed', 'received', '${timedate}')`)
                            });
                        } else if (ext == 'pdf') {
                            const getlink = media.split("/");
                            const namefile = getlink[getlink.length - 1]
                            let getstorage = `SELECT * FROM storage WHERE namafile = "${namefile}"`;
                            db.query(getstorage, function (err, result) {
                                if (err) throw err;
                                result.forEach(gs => {
                                    chika.sendMessage(sender, { document: { url: `${media}` }, mimetype: 'application/pdf', fileName: `${gs.nama_original.split('.')[0]}` })
                                })
                            })
                        }
                        break
                    case "Quick Reply Button":
                        const buttons = [
                            { buttonId: data.btn1, buttonText: { displayText: data.btn1 }, type: 1 },
                            { buttonId: data.btn2, buttonText: { displayText: data.btn2 }, type: 1 },
                            { buttonId: data.btn3, buttonText: { displayText: data.btn3 }, type: 1 }
                        ]
                        const buttonMessage = {
                            text: data.response,
                            footer: data.footer,
                            buttons: buttons,
                            headerType: 1
                        }
                        chika.sendMessage(sender, buttonMessage).then(response => {
                            db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${data.response}', '', '${data.footer}', '${data.btn1}', '${data.btn2}', '${data.btn3}', '${data.btn1}', '${data.btn2}', '${data.btn3}', 'Sent', 'received', '${timedate}')`)
                        }).catch(err => {
                            db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${data.response}', '', '${data.footer}', '${data.btn1}', '${data.btn2}', '${data.btn3}', '${data.btn1}', '${data.btn2}', '${data.btn3}', 'Failed', 'received', '${timedate}')`)
                        });
                        break
                    case "Url & Call Button":
                        const templateButtons = [
                            { index: 1, urlButton: { displayText: data.btn1, url: data.btnid1 } },
                            { index: 2, callButton: { displayText: data.btn2, phoneNumber: data.btnid2 } }
                        ]
                        const templateMessage = {
                            text: data.response,
                            footer: data.footer,
                            templateButtons: templateButtons
                        }
                        chika.sendMessage(sender, templateMessage).then(response => {
                            db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${data.response}', '', '${data.footer}', '${data.btn1}', '${data.btn2}', '', '${data.btnid1}', '${data.btnid2}', '', 'Sent', 'received', '${timedate}')`)
                        }).catch(err => {
                            db.query("INSERT INTO `reports` (`id`, `device`, `receiver`, `message`, `media`, `footer`, `btn1`, `btn2`, `btn3`, `btnid1`, `btnid2`, `btnid3`, `status`, `type`, `created_at`) VALUES" + `(NULL, '${devices}', '${receiver}', '${data.response}', '', '${data.footer}', '${data.btn1}', '${data.btn2}', '', '${data.btnid1}', '${data.btnid2}', '', 'Failed', 'received', '${timedate}')`)
                        });
                        break
                }
            });
        }
    });

    let sqlhook = `SELECT link_webhook FROM device WHERE nomor = ${mynumb} `;
    db.query(sqlhook, function (err, result) {
        if (!err) {
            const webhookurl = result[0]?.link_webhook;
            if (webhookurl != '' || webhookurl != null) {
                const pesan = {
                    sender: phoneNumberFormatter(sender),
                    msg: text
                }
                kirimwebhook(sender, text, chika, webhookurl);
            }
        }
    });

    function kirimwebhook(sender, message, chika, link) {

        var webhook_response = {
            from: phoneNumberFormatter(sender),
            message: message
        }
        request({
            url: link,
            method: "POST",
            json: webhook_response
        },
            async function (error, response) {
                if (!error && response.statusCode == 200) {
                    if (response.body == null) {
                        return 'gagal send webhook';
                    }
                    const res = response.body;
                    if (res.mode == 'chat') {
                        chika.sendMessage(sender, { text: res.pesan })
                    } else if (res.mode == 'reply') {
                        chika.sendMessage(sender, { text: res.pesan }, { quoted: mek })
                    } else if (res.mode == 'picture') {
                        const url = res.data.url;
                        const caption = res.data.caption;
                        chika.sendMessage(sender, { image: { url: `${url}` }, caption: `${caption}` })
                    }
                } else {
                    // console.log('Webhook 404');
                }
            }
        );
    }

}