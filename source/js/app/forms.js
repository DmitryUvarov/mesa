
/*

<form action="#" method="POST" class="form">
    <fieldset class="">
        <label for="email" class="">
            <span>Имя</span>
            <input id="email" name="name" class="_req" type="text" autocomplete="off">
        </label>
    </fieldset>
    <fieldset class="">
        <label for="phone" class="">
            <span>Номер телефона</span>
            <input id="phone" name="phone" class="" type="text" autocomplete="off">
        </label>
    </fieldset>
    <fieldset class="">
        <button type="submit">Отправить заявку</button>
    </fieldset>
</form>


// InputMask for number \\\

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    if (cleaned.length >= 10) var match = cleaned.match(/^(\d{1,10})(\d{9})$/);
    if (match) return match[2]
    return null
}

let Inputphone = document.querySelector('.phone');
let pastedValue = '+380'
Inputmask("+380 (99) 999-99-99", {
    // placeholder: '',
    clearIncomplete: true,
    clearMaskOnLostFocus: true,
    showMaskOnHover: false,
    onBeforePaste: function (pastedValue, opts) {
        return formatPhoneNumber(pastedValue);
    }
    // onincomplete: function () {

    // }
}).mask(Inputphone);

// \\\


*/
document.addEventListener('DOMContentLoaded', function () {

    let forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        for (let i = 0; i < forms.length; i++) {
            const el = forms[i];
            el.addEventListener('submit', formSend);
        }
    }

    async function formSend(e) {
        e.preventDefault();
        let btn = e.target;
        let form = btn.closest('form');
        let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'POST';

        let error = formValidate(form);

        let formData = new FormData(form);
        // formData.append('image', formImage.files[0]); // if true input FILE

        if (error === 0) {
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: formMethod,
                body: formData
            });
            if (response.ok) {
                // formPreview.innerHTML = ''; // if true input FILE
                form_clean(form);
                form.classList.remove('_sending');
            } else {
                alert("Ошибка отправки данных");
                form.classList.remove('_sending');
            }
        } else {
            let form_error = form.querySelectorAll('._error');
            if (form_error && form.classList.contains('_goto-error')) {
                _goto(form_error[0], 1000, 50);
            }
            e.preventDefault();
        }

    }


    function formValidate(form) {
        let error = 0;
        let form_req = form.querySelectorAll('._req');
        if (form_req.length > 0) {
            for (let index = 0; index < form_req.length; index++) {
                const el = form_req[index];
                if (!_is_hidden(el)) {
                    error += form_validate_input(el);
                }
            }
        }
        return error;
    }
    function form_validate_input(input) {
        let error = 0;
        let input_g_value = input.getAttribute('data-value');

        if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
            if (input.value != input_g_value) {
                let em = input.value.replace(" ", "");
                input.value = em;
            }
            if (email_test(input) || input.value == input_g_value) {
                form_add_error(input);
                error++;
            } else {
                form_remove_error(input);
            }
        } else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
            form_add_error(input);
            error++;
        } else {
            if (input.value == '' || input.value == input_g_value) {
                form_add_error(input);
                error++;
            } else {
                form_remove_error(input);
            }
        }
        return error;
    }
    function form_add_error(input) {
        input.classList.add('_error');
        input.parentElement.classList.add('_error');

        let input_error = input.parentElement.querySelector('.form__error');
        if (input_error) {
            input.parentElement.removeChild(input_error);
        }
        let input_error_text = input.getAttribute('data-error');
        if (input_error_text && input_error_text != '') {
            input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
        }
    }
    function form_remove_error(input) {
        input.classList.remove('_error');
        input.parentElement.classList.remove('_error');

        let input_error = input.parentElement.querySelector('.form__error');
        if (input_error) {
            input.parentElement.removeChild(input_error);
        }
    }
    function form_clean(form) {
        let inputs = form.querySelectorAll('input,textarea');
        for (let index = 0; index < inputs.length; index++) {
            const el = inputs[index];
            el.parentElement.classList.remove('_focus');
            el.classList.remove('_focus');
            el.value = el.getAttribute('data-value');
        }
        let checkboxes = form.querySelectorAll('.checkbox__input');
        if (checkboxes.length > 0) {
            for (let index = 0; index < checkboxes.length; index++) {
                const checkbox = checkboxes[index];
                checkbox.checked = false;
            }
        }
        let selects = form.querySelectorAll('select');
        if (selects.length > 0) {
            for (let index = 0; index < selects.length; index++) {
                const select = selects[index];
                const select_default_value = select.getAttribute('data-default');
                select.value = select_default_value;
                select_item(select);
            }
        }
    }
    function email_test(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function _goto(target_block, speed, offset = 0) {
        let header = '';
        //OffsetHeader
        //if (window.innerWidth < 992) {
        //	header = 'header';
        //}
        let options = {
            speedAsDuration: true,
            speed: speed,
            header: header,
            offset: offset,
            easing: 'easeOutQuad',
        };
        let scr = new SmoothScroll();
        scr.animateScroll(target_block, '', options);
    }

    function _is_hidden(el) {
        return (el.offsetParent === null)
    }
});
