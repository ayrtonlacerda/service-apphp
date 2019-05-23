# Student

##### Endpoint

**`/student`**

##  1. Entrar em um turma  - ***POST***

#### Request 

> Somente "student" pode criar um curso

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
   code: 3134483
}
```

#### Response 


| status |           mensage            |
| :----: | :--------------------------: |
|  200   |           success            |
|  401   | "o aluno pode se matricular" |
|  400   |     "classe inexistente"     |
|  500   |       "error interno"        |

exemplo JSON response

```json
{
  "mensage": "Success",
  "data": {
    "id": 6,
    "class_id": 4,
    "student_id": 10,
    "updatedAt": "2019-05-22T12:36:27.718Z",
    "createdAt": "2019-05-22T12:36:27.718Z",
    "test1": null,
    "test2": null,
    "test3": null
  }
}
```


##  2. Lista de Turmas  do usuario- ***GET***

#### Request 

exemplo header:
```javascript
{
	header: {
		Content-Type: application/json,
		authorization: ${tokenUser}
	}
}
```

#### Response 
```json

 [
    {
      "class": "A",
      "classId": 1,
      "discipline": "mat1",
      "disciplineId": 1,
      "disciplineStart": null,
      "disciplineFinish": null,
      "accountable": "caio",
      "accountableEmail": "caio@email.com"
    },
    {
      "class": "A",
      "classId": 4,
      "discipline": "mat2",
      "disciplineId": 2,
      "disciplineStart": null,
      "disciplineFinish": null,
      "accountable": "caio",
      "accountableEmail": "caio@email.com"
    }
  ]

```


| status |                mensage                |
| :----: | :-----------------------------------: |
|  200   |                  ok                   |
|  206   | nao esta matriculado em nenhuma turma |
|  400   |          usuario inexistente          |
|  500   |            "error interno"            |