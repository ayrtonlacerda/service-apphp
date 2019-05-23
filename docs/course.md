# Couse

##### Endpoint

**`/course`**

##  1. Create Course  - ***POST***

#### Request 

> Somente "admin" pode criar um curso

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
   "name": "eng computaçao",
   "enable": true
}
```

#### Response 


| status |        mensage         |
| :----: | :--------------------: |
|  200   |           ok           |
|  401   |    "Acesso negado!"    |
|  400   | "Ja existe esse curso" |
|  500   |    "error interno"     |

exemplo JSON response

```json
{
  "id": 1,
  "name": "eng computaçao",
  "enable": true,
  "updatedAt": "2019-05-21T21:22:38.985Z",
  "createdAt": "2019-05-21T21:22:38.985Z"
}
```


##  2. Atualiza um curso  - ***PUT***

#### Request 

`/couse/id`

***id*** é o id do curso que vai ser atualizado

exemplo header:
```javascript
{
	header: {
		Content-Type: application/json,
		authorization: ${tokenUser}
	}
}
```
> So um admin pode atualizar um curso

exemplo JSON no body

```json
{
   "enable": false
}
```

#### Response 


| status |            mensage             |
| :----: | :----------------------------: |
|  200   | Atualização feita com sucesso! |
|  400   |       Não ha esse curso"       |
|  401   |        "Acesso negado"         |
|  500   |        "error interno"         |


##  3. List  - ***GET***

#### Request 

consulta:
- Por id do curso
- Por nome do curso

exemplo:

`/course?course_id=id`

id é o id do curso
> Se não houver consulta retorna todos os cursos



#### Response 


| status |     mensage     |
| :----: | :-------------: |
|  200   |       ok        |
|  500   | "error interno" |

exemplo JSON response

```json
{
  "data": [
    {
      "id": 1,
      "name": "eng redes",
      "enable": true,
      "createdAt": "2019-05-20T17:37:09.279Z",
      "updatedAt": "2019-05-20T17:37:09.279Z"
    },
    {
      "id": 2,
      "name": "eng eletrica",
      "enable": true,
      "createdAt": "2019-05-20T17:38:03.587Z",
      "updatedAt": "2019-05-20T17:38:03.587Z"
    },
    {
      "id": 3,
      "name": "eng computaçao",
      "enable": true,
      "createdAt": "2019-05-20T17:38:11.951Z",
      "updatedAt": "2019-05-20T17:38:11.951Z"
    }
  ],
  "total": 3
}
```
