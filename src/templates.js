angular.module('app-cahc.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("frontend/templates/404.html",
    "<section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title></div><div class=container><div class=jumbotron><div class=row><div class=col-md-7><h1 class=display-3>Error 404</h1><p class=lead>Esta página no existe :(</p><p class=lead><a class=\"center btn btn-primary\" href=\"/\">Volver</a></p><hr class=my-4></div><div class=col-md-5><img style=\"margin:0 auto\" class=img-fluid src=/img/troll.gif></div></div></div></div></section>");
  $templateCache.put("frontend/templates/index.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=breadcrumb-item>Admin</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><div class=\"notifications container center\"><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}<script>(function(e){function animation(element){setTimeout(function(){element.animate({height:'0px'},'slow');e.empty()},5000)}animation(e)})($('.notifications'))</script></div><div ng-show=feedback_success class=\"alert alert-success\">{{feedback_success}}<script>(function(e){function animation(element){setTimeout(function(){element.animate({height:'0px'},'slow');e.empty()},5000)}animation(e)})($('.notifications'))</script></div></div><h1 class=\"center light\">Administración</h1></div><div class=\"container body-form\"><nav><ul class=\"nav nav-tabs\"><li class=nav-item><a class=\"nav-link active\" data-toggle=tab ng-click=\"currentPage = 1\" href=#notice>Noticias</a></li><li class=nav-item><a class=nav-link data-toggle=tab ng-click=\"currentPage = 2\" href=#user>Usuarios</a></li></ul><br><div class=tab-content><div class=\"tab-pane fade {{currentPage == 1 ? &quot;active in&quot; : &quot;&quot;}}\" id=notice><div class=list-group><a href=/notice class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"d-flex w-100 justify-content-between\"><h5 class=mb-1>Crear noticia</h5></div><p class=mb-1>Muestra formlario para Crear Nueva Noticia.</p></a> <a href=/notices class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"d-flex w-100 justify-content-between\"><h5 class=mb-1>Listado de noticias</h5></div><p class=mb-1>Muestra listado de todas las Noticias.</p></a></div></div><div class=\"tab-pane fade {{currentPage == 2 ? &quot;active in&quot; : &quot;&quot;}}\" id=user><div class=list-group><a href=/users class=\"list-group-item list-group-item-action flex-column align-items-start\"><div class=\"d-flex w-100 justify-content-between\"><h5 class=mb-1>Listado de usuarios</h5></div><p class=mb-1>Muestra un listado de todos los Usuarios.</p></a></div></div></div></nav></div></section>");
  $templateCache.put("frontend/templates/notice/list.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=breadcrumb-item><a class=breadcrumb-link href=\"/\">Admin</a></li><li class=\"breadcrumb-item active\">Listado de noticias</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Listado de noticias</h1></div><div class=\"container body-form\"><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><table class=\"table table-hover\"><thead><tr><th>Fecha</th><th>Autor</th><th>Titulo</th><th>Acciones</th></tr></thead><tbody><tr ng-if=notices.length ng-repeat=\"notice in notices\"><td class=date>{{setDate(notice.created)}}</td><td class=date>{{notice.autor}}</td><td>{{notice.title}}</td><td><a class=\"btn btn-outline-info btn-sm\" href=/notice/{{notice._id}}>Ver</a><form ng-if=userLoged.active ng-submit=this.delete(notice._id)><input class=\"btn btn-outline-danger btn-sm\" type=submit onclick=\"return confirm(&quot;BORRAR NOTICIA?&quot;)\" value=Borrar></form></td></tr><tr ng-if=!notices.length><td colspan=3 class=center>No hay noticias ...</td></tr></tbody></table></div></section>");
  $templateCache.put("frontend/templates/notice/new.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=breadcrumb-item><a class=breadcrumb-link href=\"/\">Admin</a></li><li class=\"breadcrumb-item active\">Crear noticia</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Crear noticia</h1></div><div class=\"container body-form\"><form ng-if=userLoged.active ng-submit=notice.create() method=post><fieldset><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div class=\"form-group {{feedback_title ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=title><b>Titulo</b></label><input id=title ng-model=notice.title class=\"form-control\"><div id=title-feedback class=form-control-feedback>{{feedback_title}}</div></div><div class=\"form-group {{feedback_category ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=category><b>Categoria</b></label><select class=form-control id=category ng-model=notice.category><option value disabled>Selecciona una opción</option><option value=ANIVERSARIO>ANIVERSARIO</option><option value=DEPORTES>DEPORTES</option><option value=\"EL CLUB\">EL CLUB</option><option value=\"FIESTA DEL CHACARERO\">FIESTA DEL CHACARERO</option><option value=HISTORIA>HISTORIA</option><option value=MEJORAS>MEJORAS</option><option value=PRENSA>PRENSA</option></select><div id=title-feedback class=form-control-feedback>{{feedback_category}}</div></div><div class=form-group><label class=form-control-label for=img_url><b>Imagen</b></label><input style=display:none ng-model=notice.url_img><div class=row><div class=\"col-lg-10 col-md-9 col-sm-8\"><input class=\"form-control form-control-file\" onchange=angular.element(this).scope().upload(this) accept=image/* id=img_url type=file><div ng-if=sending class=progress><div class=\"progress-bar progress-bar-striped progress-bar-animated\" aria-valuenow={{progress}} style=width:{{progress}}%></div></div><p ng-if=sending class=center>{{progress}}%</p><div ng-if=\"result.success === false\"><p class=\"alert alert-danger\">Error de servicio! Contácte al administrdor del sistema.<br><small><b>Respuesta del servidor de imagenes:</b> {{result.data.error}}</small></p></div><div ng-if=error><p class=\"alert alert-danger\">{{img_err}}</p></div></div><div class=\"right col-lg-2 col-md-3 col-sm-4 col-xs-7\"><div class=form-control><img class=img-fluid src=\"{{result.data.link ? result.data.link : '/img/imgdefault.png'}}\"></div></div></div></div><div class=\"form-group {{feedback_content_1 ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=content_1><b>Contenido Principal</b></label><textarea rows=4 id=content_1 type=text ng-model=notice.content_1 class=form-control></textarea><div id=content_1-feedback class=form-control-feedback>{{feedback_content_1}}</div></div><div class=\"form-group {{feedback_content_2 ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=content_2><b>Contenido Secundario</b></label><textarea rows=4 id=content_2 type=text ng-model=notice.content_2 class=form-control></textarea><div id=content_2-feedback class=form-control-feedback>{{feedback_content_2}}</div></div><div style=display:none><input id=autor ng-model=notice.autor class=\"form-control\"><div id=content_2-feedback class=form-control-feedback>{{feedback_content_2}}</div></div><a class=\"btn btn-link\" href=\"/\">Cancelar</a> <button type=submit class=\"btn btn-outline-success {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Guardar Noticia</button></fieldset></form><form ng-if=!userLoged.active><fieldset disabled><div class=\"alert alert-danger\">Todavia no puedes crear noticias. Estas pendiente de moderación. <a href=\"/\">Volver</a></div><div class=\"form-group {{feedback_title ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=title><b>Titulo</b></label><input id=title ng-model=notice.title class=\"form-control\"><div id=title-feedback class=form-control-feedback>{{feedback_title}}</div></div><div class=\"form-group {{feedback_category ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=category><b>Categoria</b></label><select class=form-control id=category ng-model=notice.category><option value disabled>Selecciona una opción</option><option value=ANIVERSARIO>ANIVERSARIO</option><option value=DEPORTES>DEPORTES</option><option value=\"EL CLUB\">EL CLUB</option><option value=\"FIESTA DEL CHACARERO\">FIESTA DEL CHACARERO</option><option value=HISTORIA>HISTORIA</option><option value=MEJORAS>MEJORAS</option><option value=PRENSA>PRENSA</option></select><div id=title-feedback class=form-control-feedback>{{feedback_category}}</div></div><div class=form-group><label class=form-control-label for=img_url><b>Imagen</b></label><input style=display:none ng-model=notice.url_img><div class=row><div class=\"col-lg-10 col-md-9 col-sm-8\"><input class=\"form-control form-control-file\" onchange=angular.element(this).scope().upload(this) accept=image/* id=img_url type=file><div ng-if=sending class=progress><div class=\"progress-bar progress-bar-striped progress-bar-animated\" aria-valuenow={{progress}} style=width:{{progress}}%></div></div><p ng-if=sending class=center>{{progress}}%</p><div ng-if=\"result.success === false\"><p class=\"alert alert-danger\">Error de servicio! Contácte al administrdor del sistema.<br><small><b>Respuesta del servidor de imagenes:</b> {{result.data.error}}</small></p></div><div ng-if=error><p class=\"alert alert-danger\">{{img_err}}</p></div></div><div class=\"right col-lg-2 col-md-3 col-sm-4 col-xs-7\"><div class=form-control><img class=img-fluid src=\"{{result.data.link ? result.data.link : '/img/imgdefault.png'}}\"></div></div></div></div><div class=\"form-group {{feedback_content_1 ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=content_1><b>Contenido Principal</b></label><textarea rows=4 id=content_1 type=text ng-model=notice.content_1 class=form-control></textarea><div id=content_1-feedback class=form-control-feedback>{{feedback_content_1}}</div></div><div class=\"form-group {{feedback_content_2 ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=content_2><b>Contenido Secundario</b></label><textarea rows=4 id=content_2 type=text ng-model=notice.content_2 class=form-control></textarea><div id=content_2-feedback class=form-control-feedback>{{feedback_content_2}}</div></div><a class=\"btn btn-link\" href=\"/\">Cancelar</a> <button type=submit class=\"btn btn-outline-success {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Guardar Noticia</button></fieldset></form></div></section>");
  $templateCache.put("frontend/templates/notice/show.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=breadcrumb-item><a class=breadcrumb-link href=\"/\">Admin</a></li><li class=breadcrumb-item><a class=breadcrumb-link href=/notices>Listado de noticias</a></li><li class=\"breadcrumb-item active\">Mostrar noticia</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Mostrar noticia</h1></div><div class=\"container body-form notice-show\"><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div class=row><div class=col-md-4><img class=\"img-fluid center\" alt={{notice.title}} src={{notice.url_img}}></div><div class=col-md-8><h3>{{notice.title}}</h3><p class=date>{{setDate(notice.created)}} - <b>{{notice.category}}</b></p><p>{{notice.content_1}}</p><p>{{notice.content_2}}</p></div></div><div class=row><div class=right><a class=\"btn btn-link\" href=/notices>Volver</a><form ng-if=userLoged.active ng-submit=this.delete(notice._id)><input class=\"btn btn-outline-danger\" type=submit onclick=\"return confirm(&quot;BORRAR NOTICIA?&quot;)\" value=Borrar></form></div></div></div></section>");
  $templateCache.put("frontend/templates/session/forgot.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=\"breadcrumb-item active\">Forgot</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Recuperar Contraseña</h1></div><div class=\"container body-form auth-form\"><form ng-submit=forgot.forgot() method=post><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div ng-show=feedback_success class=\"alert alert-success\">{{feedback_success}}</div><div class=\"form-group {{feedback_email ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=email><b>Ingresa tu Email</b></label><input id=email type=email ng-model=forgot.email class=\"form-control\"><div id=email-feedback class=form-control-feedback>{{feedback_email}}</div></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Recuperar Contraseña</button> <a class=\"btn btn-link right\" href=/login>Volver</a></form></div></section>");
  $templateCache.put("frontend/templates/session/login.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=\"breadcrumb-item active\">Entrar</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Entrar</h1></div><div class=\"container body-form auth-form\"><form ng-submit=login.login() method=post><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div class=\"form-group {{feedback_email ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=email><b>Email</b></label><input id=email type=email ng-model=login.email class=\"form-control\"><div id=email-feedback class=form-control-feedback>{{feedback_email}}</div></div><div class=\"form-group {{feedback_password ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Contraseña</b></label><input id=password type=password ng-model=login.password class=\"form-control\"><div id=password-feedback class=form-control-feedback>{{feedback_password}}</div></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Autenticarse</button> <a class=\"btn btn-link right\" href=/forgot>Perdiste la contraseña?</a></form></div></section>");
  $templateCache.put("frontend/templates/session/reset.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=\"breadcrumb-item active\">Reset</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Restablecer Contraseña</h1></div><div class=\"container body-form auth-form\"><form ng-submit=reset.reset() method=post><fieldset><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div ng-show=feedback_success class=\"alert alert-success\">{{feedback_success}}</div><div class=\"form-group {{feedback_password ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Nueva Contraseña</b></label><input id=password type=password ng-model=reset.password required class=\"form-control\"></div><div class=\"form-group {{feedback_password_bis ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Repetir Contraseña</b></label><input id=password-bis type=password ng-model=reset.password_bis required class=\"form-control\"></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Actualizar Contraseña</button></fieldset></form></div></section>");
  $templateCache.put("frontend/templates/session/signup.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=\"breadcrumb-item active\">Registrarse</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Registrarse</h1></div><div class=\"container body-form auth-form\"><form ng-submit=signup.signup() method=post><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><div class=\"form-group {{feedback_name ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=name><b>Nombre Completo</b></label><input id=name type=name ng-model=signup.name class=\"form-control\"><div id=name-feedback class=form-control-feedback>{{feedback_name}}</div></div><div class=\"form-group {{feedback_email ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=email><b>Email</b></label><input id=email type=email ng-model=signup.email class=\"form-control\"><div id=email-feedback class=form-control-feedback>{{feedback_email}}</div></div><div class=\"form-group {{feedback_password ? &quot;has-danger&quot; : &quot;&quot;}}\"><label class=form-control-label for=password><b>Contraseña</b></label><input id=password type=password ng-model=signup.password class=\"form-control\"><div id=password-feedback class=form-control-feedback>{{feedback_password}}</div></div><button type=submit class=\"btn btn-outline-primary {{loading ? &quot;disabled&quot; : &quot;&quot;}}\">Registrarse</button></form></div></section>");
  $templateCache.put("frontend/templates/user/list.html",
    "<div id=subnav><ol class=breadcrumb><div class=container><li class=breadcrumb-item><a class=breadcrumb-link href=\"/\">Admin</a></li><li class=\"breadcrumb-item active\">Listado de usuarios</li><div id=time class=\"right date\"></div></div></ol></div><section id=template-content class=\"{{loading ? &quot;load&quot; : &quot;&quot;}}\"><section id=img-load-content class=\"{{loading ? &quot;view&quot; : &quot;&quot;}}\"><img id=img-load src=img/img-load.gif alt=img-load.gif></section><div class=head-title><h1 class=\"center light\">Listado de usuarios</h1></div><div class=\"container body-form\"><div ng-show=feedback_err class=\"alert alert-danger\">{{feedback_err}}</div><table class=\"table table-hover\"><thead><tr><th>Nombre</th><th>Email</th><th>Estado</th><th ng-if=userLoged.active>Acciones</th></tr></thead><tbody><tr ng-if=users.length ng-repeat=\"user in users\"><td class=date>{{user.name}}</td><td>{{user.email}}</td><td class=\"{{user.active == false ? 'alert-danger' : 'alert-success'}}\">{{user.active == false ? 'Pendiente' : 'Activo'}}</td><td ng-if=\"userLoged.active && user._id != userLoged._id\"><form ng-submit=this.delete(user._id)><input class=\"btn btn-outline-danger btn-sm\" type=submit onclick=\"return confirm(&quot;BORRAR USUARIO?&quot;)\" value=Borrar></form><form ng-if=!user.active ng-submit=this.activate(user._id)><input class=\"btn btn-outline-success btn-sm\" type=submit value=Activar></form><form ng-if=\"user.active && user._id != userLoged._id\" ng-submit=this.block(user._id)><input class=\"btn btn-outline-warning btn-sm\" type=submit value=Bloquear></form></td></tr><tr ng-if=!users.length><td colspan=4 class=center>No hay usuarios ...</td></tr></tbody></table></div></section>");
}]);
