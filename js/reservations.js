const btn = document.getElementById('button');

document.getElementById('form')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.value = 'Enviando...';

        const serviceID = 'default_service';
        const templateID = 'template_vdn6hqr';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.value = 'Reservacion solicitada';
                alert('Se ha enviado la reservacion');
            }, (err) => {
                btn.value = 'Reservar';
                alert(JSON.stringify(err));
            });
    });