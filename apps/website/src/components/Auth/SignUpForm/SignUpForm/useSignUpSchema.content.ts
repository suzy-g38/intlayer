import { type Dictionary, t } from 'intlayer';

export const signUpSchemaContent = {
  key: 'sign-up-schema',
  content: {
    requiredErrorEmail: t({
      en: 'Please enter your email address',
      'en-GB': 'Please enter your email address',
      fr: 'Veuillez saisir votre adresse e-mail',
      es: 'Por favor, ingrese su dirección de correo electrónico',
      de: 'Bitte geben Sie Ihre E-Mail-Adresse ein',
      ja: 'メールアドレスを入力してください',
      ko: '이메일 주소를 입력해주세요',
      zh: '请输入您的电子邮件地址',
      it: 'Si prega di inserire il proprio indirizzo email',
      pt: 'Por favor, insira seu endereço de e-mail',
      hi: 'कृपया अपना ईमेल पता दर्ज करें',
      ar: 'يرجى إدخال عنوان بريدك الإلكتروني',
      ru: 'Пожалуйста, введите свой адрес электронной почты',
    }),

    invalidTypeErrorEmail: t({
      en: 'Please enter a valid email address',
      'en-GB': 'Please enter a valid email address',
      fr: 'Veuillez saisir une adresse e-mail valide',
      es: 'Por favor, ingrese una dirección de correo electrónico válida',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      ja: '正しいメールアドレスを入力してください',
      ko: '유효한 이메일 주소를 입력해주세요',
      zh: '请输入有效的电子邮件地址',
      it: 'Si prega di inserire un indirizzo email valido',
      pt: 'Por favor, insira um endereço de e-mail válido',
      hi: 'कृपया एक वैध ईमेल पता दर्ज करें',
      ar: 'يرجى إدخال عنوان بريد إلكتروني صالح',
      ru: 'Пожалуйста, введите корректный адрес электронной почты',
    }),

    requiredErrorPassword: t({
      en: 'Please enter your password',
      'en-GB': 'Please enter your password',
      fr: 'Veuillez saisir votre mot de passe',
      es: 'Por favor, ingrese su contraseña',
      de: 'Bitte geben Sie Ihr Passwort ein',
      ja: 'パスワードを入力してください',
      ko: '비밀번호를 입력해주세요',
      zh: '请输入您的密码',
      it: 'Si prega di inserire la propria password',
      pt: 'Por favor, insira sua senha',
      hi: 'कृपया अपना पासवर्ड डालें',
      ar: 'يرجى إدخال كلمة المرور الخاصة بك',
      ru: 'Пожалуйста, введите ваш пароль',
    }),

    invalidTypeErrorPassword: t({
      en: 'Please enter a valid password',
      'en-GB': 'Please enter a valid password',
      fr: 'Veuillez saisir un mot de passe valide',
      es: 'Por favor, ingrese una contraseña válida',
      de: 'Bitte geben Sie ein gültiges Passwort ein',
      ja: '有効なパスワードを入力してください',
      ko: '유효한 비밀번호를 입력해주세요',
      zh: '请输入有效的密码',
      it: 'Si prega di inserire una password valida',
      pt: 'Por favor, insira uma senha válida',
      hi: 'कृपया एक वैध पासवर्ड दर्ज करें',
      ar: 'يرجى إدخال كلمة مرور صالحة',
      ru: 'Пожалуйста, введите корректный пароль',
    }),

    requiredErrorPasswordConfirmation: t({
      en: 'Please enter your password again',
      'en-GB': 'Please enter your password again',
      fr: 'Veuillez saisir votre mot de passe à nouveau',
      es: 'Por favor, ingrese su contraseña nuevamente',
      de: 'Bitte geben Sie Ihr Passwort erneut ein',
      ja: '再度パスワードを入力してください',
      ko: '비밀번호를 다시 입력해주세요',
      zh: '请再次输入您的密码',
      it: 'Si prega di reinserire la propria password',
      pt: 'Por favor, insira sua senha novamente',
      hi: 'कृपया अपना पासवर्ड फिर से दर्ज करें',
      ar: 'يرجى إعادة إدخال كلمة المرور الخاصة بك',
      ru: 'Пожалуйста, введите ваш пароль еще раз',
    }),

    invalidTypeErrorPasswordConfirmation: t({
      en: 'Please enter a valid password',
      'en-GB': 'Please enter a valid password',
      fr: 'Veuillez saisir un mot de passe valide',
      es: 'Por favor, ingrese una contraseña válida',
      de: 'Bitte geben Sie ein gültiges Passwort ein',
      ja: '有効なパスワードを入力してください',
      ko: '유효한 비밀번호를 입력해주세요',
      zh: '请输入有效的密码',
      it: 'Si prega di inserire una password valida',
      pt: 'Por favor, insira uma senha válida',
      hi: 'कृपया एक वैध पासवर्ड दर्ज करें',
      ar: 'يرجى إدخال كلمة مرور صالحة',
      ru: 'Пожалуйста, введите корректный пароль',
    }),

    passwordNotMatchError: t({
      en: 'Password and password confirmation must match',
      'en-GB': 'Password and password confirmation must match',
      fr: 'Le mot de passe et la confirmation de mot de passe doivent correspondre',
      es: 'La contraseña y la confirmación de la contraseña deben coincidir',
      de: 'Das Passwort und die Bestätigung müssen übereinstimmen',
      ja: 'パスワードと確認用パスワードは一致する必要があります',
      ko: '비밀번호와 비밀번호 확인이 일치해야 합니다',
      zh: '密码和密码确认必须匹配',
      it: 'La password e la conferma della password devono corrispondere',
      pt: 'A senha e a confirmação da senha devem coincidir',
      hi: 'पासवर्ड और पासवर्ड की पुष्टि मेल खानी चाहिए',
      ar: 'يجب أن تتطابق كلمة المرور وتأكيد كلمة المرور',
      ru: 'Пароль и подтверждение пароля должны совпадать',
    }),
    termsAndConditionsError: t({
      en: 'You must agree to the terms and conditions',
      'en-GB': 'You must agree to the terms and conditions',
      fr: "Vous devez accepter les conditions d'utilisation",
      es: 'Debes aceptar los términos y condiciones',
      de: 'Sie müssen den Nutzungsbedingungen zustimmen',
      ja: '利用規約に同意する必要があります',
      ko: '이용 약관에 동의해야 합니다',
      zh: '您必须同意使用条款',
      it: "Devi accettare i termini e le condizioni d'uso",
      pt: 'Você deve concordar com os termos e condições',
      hi: 'शर्तें और शर्तें सहमत होते हैं',
      ar: 'يجب أن توافق على شروط وأحكامنا',
      ru: 'Вы должны согласиться с условиями и положениями',
    }),
  },
} satisfies Dictionary;

export default signUpSchemaContent;
