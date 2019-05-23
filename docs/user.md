# User

##### Endpoint

**`/user`**

#####  Tipos de usuarios :
|  Type   |                              Permissões                              |
| :-----: | :------------------------------------------------------------------: |
|  admin  | Criar curso; Criar disciplina; criar turma -  Nao pode se matricular |
|  prof   |       Criar disciplina; criar turma -  Nao pode se matricular        |
| student |                        So pode se matricular                         |

##  1. Create User  - ***POST***

#### Request 

> Não necessita de parametros no header para cadastrar usuarios do tipo 'student', contudo para cadastrar usuario do tipo 'admin' e 'prof' somente usuariod do tipo 'admin'

exemplo header:

```javascript
{
	header: {
		Content-Type: application/json,
		authorization: ${tokenUser}
	}
}
```

exemplo JSON no body

```json
    {
    	"name": "andre",
    	"email": "andre@email.com",
    	"type": "student",
    	"password_hash": "sqn409"	
    }
```

#### Response 


| status |                      mensage                       |
| :----: | :------------------------------------------------: |
|  200   |              "Cadastrado com sucesso"              |
|  401   | "Usuario não tem permissão de cadastrar professor" |
|  401   |           "Precisa de um usuario admin"            |
|  400   |              "Usuario ja cadastrado"               |
|  500   |                  "error interno"                   |

exemplo JSON response

```json
   {
	  "mensage": "Cadastrado com sucesso",
	  "user": {
			"id": 10,
			"name": "andre",
			"email": "andre@email.com",
			"type": "student",
			"password_hash": "sqn409",
			"token": "22b38bd9c8295e16c5b862295142c6f94a5c83d77969fab20bcf30724ef82a19",
			"updatedAt": "2019-05-22T12:31:46.283Z",
			"createdAt": "2019-05-22T12:31:46.283Z",
			"validity": null
	  }
}
```


##  2. Login  - ***POST***

#### Request 

> Não necessita de parametros no header

exemplo JSON no body

```json
    {
		"email": "ayrton@email.com",
		"password": "sqn409"
	}
```

#### Response 


| status |        mensage        |
| :----: | :-------------------: |
|  200   |          ok           |
|  400   | "Usuario inexistente" |
|  400   |  "Senha incorreta!"   |
|  500   |    "error interno"    |

exemplo JSON response

```json
{
  "name": "ayrton",
  "email": "ayrton@email.com",
  "token": "777"
}
```

##  2. List  - ***GET***

#### Request 
> Não necessita de parametros no header


#### Response 


| status |     mensage     |
| :----: | :-------------: |
|  200   |       ok        |
|  500   | "error interno" |

exemplo JSON response

```json
[
	  {
		"id": 2,
		"name": "ayrton",
		"email": "ayrton@email.com",
		"type": "admin",
		"token": "777",
		"validity": null,
		"password_hash": "sqn409",
		"createdAt": "2019-05-20T17:15:12.264Z",
		"updatedAt": "2019-05-20T17:18:43.441Z"
	  },
	  {
		"id": 4,
		"name": "caio",
		"email": "caio@email.com",
		"type": "prof",
		"token": "1234",
		"validity": null,
		"password_hash": "sqn409",
		"createdAt": "2019-05-20T17:24:09.107Z",
		"updatedAt": "2019-05-20T17:24:09.107Z"
	  }
]
```

