var yo = require('yo-yo');
var landing = require('../landing/index.js');
var translate = require('../translate');

//gracia a yo-yo este estring qu es nuestro html va ser un elemento html 
//modolu.expots nos permite definir nuestro codigo en modoulos 
var signinForm = yo`
        <div class="col s12 m7">
		    <div class="row">
		        <div class="signup-box">
					<h1 class="platzigram">Senagram</h1>
					<form class="signup-form" action="/login" method="POST">
						
						<div class="section">
							<a class="btn btn-fb hide-on-small-only">${translate.message('signup.facebook')}</a>
							<a class="btn btn-fb hide-on-med-and-up"><i class="fa fa-facebook-official"></i>${translate.message('signup.text')}</a>
						</div>
						<div class="divider">
                        
                        </div>
						<div class="section">
							<input type="text" name="username" placeholder="${translate.message('username')}" />
							<input type="password" name="password" placeholder="${translate.message('password')}" />
							<button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.text')}</button>
						</div>
					</form>
				</div>
			</div>
			<div class="row">
				<div class="login-box">
					${translate.message('signin.not-have-account')}<a href="/signin">${translate.message('signup.call-to-action')}</a>
				</div>
			</div>
        </div>`;

module.exports = landing(signinForm);
