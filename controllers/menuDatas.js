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
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FcatMenu.jpg?alt=media&token=283aae65-4450-4ae4-b41d-46da0e35a24b',
		title: animalKinds[0].translate,
		type: animalKinds[0].type,
		categoryNames: {
			myLinks: ['/animals/cat/buy', '/animals/cat/find', '/animals/cat/missing', '/animals/cat/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e123r2e3', '2f3f32', 'f4f34', '4r4f34']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2FdogMenu.jpg?alt=media&token=61db6dd0-933d-4050-be3f-631038d95c0e',
		title: animalKinds[1].translate,
		type: animalKinds[1].type,
		categoryNames: {
			myLinks: ['/animals/dog/buy', '/animals/dog/find', '/animals/dog/missing', '/animals/dog/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e123e3', '2f3ewf2', 'f434f', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fparrot.jpg?alt=media&token=a9042563-7b2e-4744-9741-79204e25af64',
		title: animalKinds[2].translate,
		type: animalKinds[2].type,
		categoryNames: {
			myLinks: ['/animals/parrot/buy', '/animals/parrot/find', '/animals/parrot/missing', '/animals/parrot/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fhare.jpg?alt=media&token=f8f5156b-a298-4e7b-afc7-b13b14265132',
		title: animalKinds[3].translate,
		type: animalKinds[3].type,
		categoryNames: {
			myLinks: ['/animals/hare/buy', '/animals/hare/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fchamp.jpg?alt=media&token=c8890970-fd64-4c27-9bd2-8a830c0e81e3',
		title: animalKinds[4].translate,
		type: animalKinds[4].type,
		categoryNames: {
			myLinks: ['/animals/champ/buy', '/animals/champ/find', '/animals/champ/missing', '/animals/champ/gift'],
			names: [typesList[0], typesList[1], typesList[2], typesList[3]],
			key: ['e1f322e3', '2ff33f2', 'f43334', '4rf32434', '4r43442']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Ffish.jpg?alt=media&token=7f70e25d-0b99-49fd-8221-949d77ac1147',
		title: animalKinds[5].translate,
		type: animalKinds[5].type,
		categoryNames: {
			myLinks: ['/animals/fish/buy', '/animals/fish/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fdomesticbird.jpg?alt=media&token=94cbd183-326c-4b38-a251-8d159c011631',
		title: animalKinds[6].translate,
		type: animalKinds[6].type,
		categoryNames: {
			myLinks: ['/animals/chAnimals/buy', '/animals/chAnimals/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fdomesticbird.jpg?alt=media&token=94cbd183-326c-4b38-a251-8d159c011631',
		title: animalKinds[7].translate,
		type: animalKinds[7].type,
		categoryNames: {
			myLinks: ['/animals/rodents/buy', '/animals/rodents/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fdomesticbird.jpg?alt=media&token=94cbd183-326c-4b38-a251-8d159c011631',
		title: animalKinds[8].translate,
		type: animalKinds[8].type,
		categoryNames: {
			myLinks: ['/animals/replites/buy', '/animals/replites/gift'],
			names: [typesList[0], typesList[3]],
			key: ['e1f322e3', '2ff33f2']
		}
	},
	{
		img: 'https://firebasestorage.googleapis.com/v0/b/animals-bbfac.appspot.com/o/menu%2Fother.png?alt=media&token=1d8fe29a-2fa3-418f-8e8d-1cc1a1a1901d',
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
