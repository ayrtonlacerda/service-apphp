# Forms

##### Endpoint

**`/form`**

##  1. Create form  - ***POST***

#### Request 

> Somente "admin" e "prof" pode criar um fors

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
  "area": "Area de teste",
  "steps": [
    {
      "step_name": "Catálogo",
      "components": [
        {
          "hint": "OCR do local",
          "group": "false",
          "label": "OCR",
          "required": "true",
          "data_name": "ocr_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "ocr",
          "required_message": ""
        },
        {
          "hint": "Croqui do local",
          "group": "false",
          "label": "Croqui",
          "required": "true",
          "data_name": "croqui_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "croqui",
          "required_message": ""
        },
        {
          "hint": "Tire uma foto ou selecione da galeria",
          "group": "false",
          "label": "Tire uma foto",
          "required": "",
          "data_name": "camera_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "camera",
          "required_message": ""
        },
        {
          "hint": "Insira um texto",
          "group": "false",
          "label": "Digite um texto",
          "required": "true",
          "data_name": "texto_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "text",
          "required_message": ""
        },
        {
          "hint": "Grave um áudio",
          "group": "false",
          "label": "Gravador de áudio",
          "required": "true",
          "data_name": "audiorec_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "audiorec",
          "required_message": ""
        },
        {
          "hint": "Use o GPS",
          "group": "false",
          "label": "Localização",
          "required": "true",
          "data_name": "geoloc_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "geoloc",
          "required_message": ""
        },
        {
          "hint": "Pesquise um veículo",
          "group": "false",
          "label": "Acesso a APIs e BDs externos",
          "required": "true",
          "data_name": "veiculo_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "veiculo",
          "required_message": ""
        },
        {
          "hint": "Lista de atividades",
          "group": "false",
          "label": "Lista de ToDos - Checkbox",
          "required": "true",
          "data_name": "checkbox_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "checkbox",
          "required_message": ""
        },
        {
          "hint": "Componente data",
          "group": "false",
          "label": "Componente data",
          "required": "true",
          "data_name": "data_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "date",
          "required_message": ""
        },
        {
          "hint": "Componente scanner",
          "group": "false",
          "label": "Componente data",
          "required": "true",
          "data_name": "scanner_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "scanner",
          "required_message": ""
        },
        {
          "hint": "Componente período",
          "group": "false",
          "label": "Componente período",
          "required": "true",
          "data_name": "periodo_1",
          "lenght_max": "",
          "length_min": "",
          "invalid_text": "",
          "default_value": "",
          "component_type": "periodo",
          "required_message": ""
        }
      ],
      "step_description": "Catálogo de componentes do AppINC"
    }
  ],
  "classe": "Testes e homologações",
  "form_name": "teste",
  "info_form": "Formulário contendo todos os tipos de componente",
  "sub_classe": "Laudos de teste",
  "form_titulo": "Catálogo",
  "form_version": "1.0",
	"discipline": 1
}
```

Obs :  o camapo "discipline" foi adicionado ao formulario, que respresenta a que disciplina pertence esse test

#### Response 


|  status |  mensage |
| :------------: | :------------: |
|  200 | Success |
|  400 |"Ja existe esse teste para essa disciplina" |
|  401 | ""Você tem que esta logado para cadastrar formularios"" |
|  401 | "Usuario não autorizad" |
| 500  |  "error interno" |

exemplo JSON response

```json
{
  "mensage": "Sucesso",
  "data": {
    "id": 29,
    "table_name": "teste34",
    "enable": true,
    "discipline_id": 1,
    "data": {
      "area": "Area de teste",
      "steps": [
        {
          "step_name": "Catálogo",
          "components": [
            {
              "hint": "OCR do local",
              "group": "false",
              "label": "OCR",
              "required": "true",
              "data_name": "ocr_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "ocr",
              "required_message": ""
            },
            {
              "hint": "Croqui do local",
              "group": "false",
              "label": "Croqui",
              "required": "true",
              "data_name": "croqui_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "croqui",
              "required_message": ""
            },
            {
              "hint": "Tire uma foto ou selecione da galeria",
              "group": "false",
              "label": "Tire uma foto",
              "required": "",
              "data_name": "camera_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "camera",
              "required_message": ""
            },
            {
              "hint": "Insira um texto",
              "group": "false",
              "label": "Digite um texto",
              "required": "true",
              "data_name": "texto_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "text",
              "required_message": ""
            },
            {
              "hint": "Grave um áudio",
              "group": "false",
              "label": "Gravador de áudio",
              "required": "true",
              "data_name": "audiorec_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "audiorec",
              "required_message": ""
            },
            {
              "hint": "Use o GPS",
              "group": "false",
              "label": "Localização",
              "required": "true",
              "data_name": "geoloc_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "geoloc",
              "required_message": ""
            },
            {
              "hint": "Pesquise um veículo",
              "group": "false",
              "label": "Acesso a APIs e BDs externos",
              "required": "true",
              "data_name": "veiculo_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "veiculo",
              "required_message": ""
            },
            {
              "hint": "Lista de atividades",
              "group": "false",
              "label": "Lista de ToDos - Checkbox",
              "required": "true",
              "data_name": "checkbox_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "checkbox",
              "required_message": ""
            },
            {
              "hint": "Componente data",
              "group": "false",
              "label": "Componente data",
              "required": "true",
              "data_name": "data_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "date",
              "required_message": ""
            },
            {
              "hint": "Componente scanner",
              "group": "false",
              "label": "Componente data",
              "required": "true",
              "data_name": "scanner_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "scanner",
              "required_message": ""
            },
            {
              "hint": "Componente período",
              "group": "false",
              "label": "Componente período",
              "required": "true",
              "data_name": "periodo_1",
              "lenght_max": "",
              "length_min": "",
              "invalid_text": "",
              "default_value": "",
              "component_type": "periodo",
              "required_message": ""
            }
          ],
          "step_description": "Catálogo de componentes do AppINC"
        }
      ],
      "classe": "Testes e homologações",
      "form_name": "teste34",
      "info_form": "Formulário contendo todos os tipos de componente",
      "sub_classe": "Laudos de teste",
      "form_titulo": "Catálogo",
      "form_version": "1.0",
      "discipline": 1
    },
    "updatedAt": "2019-05-23T15:54:56.278Z",
    "createdAt": "2019-05-23T15:54:56.278Z",
    "validity": null
  },
  "schemaTable": [
    {
      "name": "ocr_1",
      "type": "string"
    },
    {
      "name": "croqui_1",
      "type": "string"
    },
    {
      "name": "camera_1",
      "type": "string"
    },
    {
      "name": "texto_1",
      "type": "string"
    },
    {
      "name": "audiorec_1",
      "type": "string"
    },
    {
      "name": "geoloc_1",
      "type": "json"
    },
    {
      "name": "checkbox_1",
      "type": "json"
    },
    {
      "name": "data_1",
      "type": "date"
    },
    {
      "name": "scanner_1",
      "type": "string"
    }
  ]
}
}
```


##  2. List  - ***GET***

#### Request 

exemplo header

```javascript
{
	header: {
		Content-Type: application/json,
		authorization: ${tokenUser}
	}
}
```

exemplo query

`/form?discipline=disciplineId`
disciplineId é o id da disciplina na qual quer filtra os testes

#### Response 


|  status |  mensage |
| :------------: | :------------: |
|  200 |  ok |
| 500  |  "error interno" |

exemplo JSON response

```json
[
  {
    "id": 27,
    "table_name": "pericia_veiculos",
    "enable": true,
    "validity": null,
	"data": [ ... ]
	"createdAt": "2019-05-22T13:43:42.806Z",
    "updatedAt": "2019-05-22T13:43:42.806Z",
    "discipline_id": 2
  },
  {
    "id": 2,
    "table_name": "pericia_veiculos",
    "enable": true,
    "validity": null,
	"data": [ ... ]
	"createdAt": "2019-05-22T13:43:42.806Z",
    "updatedAt": "2019-05-22T13:43:42.806Z",
    "discipline_id": 2
  },
]
```

##  3. Recebendo dados de form  - ***POST***

####Url

`/form/receiver`
#### Request 
exemplo header:

```javascript
{
 header: {
   Content-Type: application/json,
   authorization: tokenUser,
   test_name: testName,
   disciplineId: id
  }
}
```


#### Response 


|  status |  mensage |
| :------------: | :------------: |
|  200 |  ok |
| 500  |  "error interno" |

exemplo JSON response

```json
{
  "mensage": "ok",
  "file": [
    {
      "fieldname": "camera_21",
      "originalname": "pritcodigojhoa.png",
      "encoding": "7bit",
      "mimetype": "image/png",
      "destination": "/home/ayrton/Documentos/Code/cerradoti/service-hp/tmp/uploads",
      "filename": "e307ecb40402411ffbeb76bad53f04d8.png",
      "path": "/home/ayrton/Documentos/Code/cerradoti/service-hp/tmp/uploads/e307ecb40402411ffbeb76bad53f04d8.png",
      "size": 367789
    },
    {
      "fieldname": "camera_1",
      "originalname": "wolfpackblue2.png",
      "encoding": "7bit",
      "mimetype": "image/png",
      "destination": "/home/ayrton/Documentos/Code/cerradoti/service-hp/tmp/uploads",
      "filename": "3f20423aa384b4b26b14fed1a4e2613c.png",
      "path": "/home/ayrton/Documentos/Code/cerradoti/service-hp/tmp/uploads/3f20423aa384b4b26b14fed1a4e2613c.png",
      "size": 155661
    }
  ],
  "body": {
    "texto_21": "sadsa",
    "scanner_21": "sdad",
    "scanner_87435": "11111",
    "texto_1": "2222"
  }
}
```

