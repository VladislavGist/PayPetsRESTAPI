const animalKinds = [
	{ type: 'cat', translate: 'Кошки' },
	{ type: 'dog', translate: 'Собаки' },
	{ type: 'parrot', translate: 'Попугаи' },
	{ type: 'hare', translate: 'Зайцы / кролики' },
	{ type: 'champ', translate: 'Хорьки' },
	{ type: 'fish', translate: 'Рыбки и акв. жив.' },
	{ type: 'chAnimals', translate: 'С/х животные' },
	{ type: 'rodents', translate: 'Грызуны' },
	{ type: 'replites', translate: 'Рептилии' },
	{ type: 'other', translate: 'Другие' }
]

const typesList = [
	{ type: 'buy', translate: 'Купить', count: 0 },
	{ type: 'find', translate: 'Находка', count: 0 },
	{ type: 'missing', translate: 'Пропажа', count: 0 },
	{ type: 'gift', translate: 'Даром', count: 0 },
]

const menuData = [
	{
		img: '/images/menu/cat.jpg',
		title: animalKinds[0].translate,
		type: animalKinds[0].type,
		categoryNames: {
			myLinks: ['/animals/cat/buy', '/animals/cat/find', '/animals/cat/missing', '/animals/cat/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e123r2e3', '2f3f32', 'f4f34', '4r4f34']
		}
	},
	{
		img: '/images/menu/dog.jpg',
		title: animalKinds[1].translate,
		type: animalKinds[1].type,
		categoryNames: {
			myLinks: ['/animals/dog/buy', '/animals/dog/find', '/animals/dog/missing', '/animals/dog/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e123e3', '2f3ewf2', 'f434f', '4r43442']
		}
	},
	{
		img: '/images/menu/parrot.jpg',
		title: animalKinds[2].translate,
		type: animalKinds[2].type,
		categoryNames: {
			myLinks: ['/animals/parrot/buy', '/animals/parrot/find', '/animals/parrot/missing', '/animals/parrot/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: '/images/menu/hare.jpg',
		title: animalKinds[3].translate,
		type: animalKinds[3].type,
		categoryNames: {
			myLinks: ['/animals/hare/buy', '/animals/hare/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: '/images/menu/champ.jpg',
		title: animalKinds[4].translate,
		type: animalKinds[4].type,
		categoryNames: {
			myLinks: ['/animals/champ/buy', '/animals/champ/find', '/animals/champ/missing', '/animals/champ/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: '/images/menu/fish.jpg',
		title: animalKinds[5].translate,
		type: animalKinds[5].type,
		categoryNames: {
			myLinks: ['/animals/fish/buy', '/animals/fish/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: '/images/menu/chAnimals.jpg',
		title: animalKinds[6].translate,
		type: animalKinds[6].type,
		categoryNames: {
			myLinks: ['/animals/chAnimals/buy', '/animals/chAnimals/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: '/images/menu/rodents.jpg',
		title: animalKinds[7].translate,
		type: animalKinds[7].type,
		categoryNames: {
			myLinks: ['/animals/rodents/buy', '/animals/rodents/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: '/images/menu/reptile.jpg',
		title: animalKinds[8].translate,
		type: animalKinds[8].type,
		categoryNames: {
			myLinks: ['/animals/replites/buy', '/animals/replites/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: '/images/menu/other.png',
		title: animalKinds[9].translate,
		type: animalKinds[9].type,
		categoryNames: {
			myLinks: ['/animals/other/buy', '/animals/other/find', '/animals/other/missing', '/animals/other/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1gref322e3', '2ff3re3f2', 'f4354334', '4rf32gt434', '4r434gtr42']
		}
	}
]

exports.animalKinds = animalKinds
exports.menuData = menuData
exports.typesList = typesList