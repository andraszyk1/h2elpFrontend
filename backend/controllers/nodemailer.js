import nodemailer from 'nodemailer'
export const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    secure: false,
    port: '587',
    tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: false,
    },
    auth: {
    user: "lukasz.andraszyk@maflow.com",
    pass: "33Maflow",
    },
    debug: true,
    logger:true,
    });
    export async function createTicketMail(nr_zgloszenia,autor_zgloszenia,data_utworzenia_zgloszenia,kategoria,status,temat,tresc){
        await transporter.sendMail({
            from: '"Łukasz Andraszyk👻" <lukasz.andraszyk@maflow.com>', // sender address
            to: "Łukasz Andraszyk, lukasz.andraszyk@maflow.com", // list of receivers
            subject: `Rejestracja zgłoszenie ${nr_zgloszenia}`, // Subject line
            text: "text nowe zgloszenie", // plain text body
            html: `<h4>Helpdesk Maflow Witamy,</h4>
            <a href=http://192.168.60.112:3001/tickets/${nr_zgloszenia}><b>Zgłoszenie nr ${nr_zgloszenia}</b></a> zostało zarejestrowane w systemie.</br>
            <b>Autor: </b>${autor_zgloszenia}</br>
            <b>Temat zgłoszenia: </b>${temat}</br>
            <b>Kategoria: </b>${kategoria}</br>
            <b>Status: </b>${status}</br>
            <b>Treść: </b></br>
            ${tresc}</br>
            <b>Data utworzenia: </b><small> ${data_utworzenia_zgloszenia}</small>
            `
            
          });
        
          
        }