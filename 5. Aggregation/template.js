/* ********************************************************* */
db.persons.aggregate([
	{ $match: { gender: "female" } },
	{ $group: { _id: {state: "$location.state"}, totalPersons: {$sum: 1} } }
]).pretty()

// Result
/* { "_id" : { "state" : "gümüşhane" }, "totalPersons" : 8 }
{ "_id" : { "state" : "loire-atlantique" }, "totalPersons" : 4 }
{ "_id" : { "state" : "muş" }, "totalPersons" : 6 }
{ "_id" : { "state" : "siirt" }, "totalPersons" : 6 }
{ "_id" : { "state" : "merseyside" }, "totalPersons" : 4 }
{ "_id" : { "state" : "nordjylland" }, "totalPersons" : 54 }
{ "_id" : { "state" : "hamburg" }, "totalPersons" : 24 }
{ "_id" : { "state" : "bahia" }, "totalPersons" : 8 }
{ "_id" : { "state" : "hovedstaden" }, "totalPersons" : 42 }
{ "_id" : { "state" : "new brunswick" }, "totalPersons" : 18 }
{ "_id" : { "state" : "limerick" }, "totalPersons" : 10 }
{ "_id" : { "state" : "south yorkshire" }, "totalPersons" : 6 }
{ "_id" : { "state" : "county antrim" }, "totalPersons" : 2 }
{ "_id" : { "state" : "خراسان رضوی" }, "totalPersons" : 20 }
{ "_id" : { "state" : "kayseri" }, "totalPersons" : 4 }
{ "_id" : { "state" : "haute-loire" }, "totalPersons" : 4 }
{ "_id" : { "state" : "گیلان" }, "totalPersons" : 20 }
{ "_id" : { "state" : "loire" }, "totalPersons" : 4 }
{ "_id" : { "state" : "kainuu" }, "totalPersons" : 22 }
{ "_id" : { "state" : "castilla y león" }, "totalPersons" : 24 } */



/* ********************************************************* */
// With Sorting
db.persons.aggregate([
	{ $match: { gender: "female" } },
	{ $group: { _id: { state: "$location.state" }, totalPersons: { $sum: 1 } } },
	{ $sort: { totalPersons: -1 } }
]).pretty()

// Result
/* { "_id" : { "state" : "new south wales" }, "totalPersons" : 48 }
{ "_id" : { "state" : "syddanmark" }, "totalPersons" : 48 }
{ "_id" : { "state" : "south australia" }, "totalPersons" : 44 }
{ "_id" : { "state" : "hovedstaden" }, "totalPersons" : 42 }
{ "_id" : { "state" : "danmark" }, "totalPersons" : 42 }
{ "_id" : { "state" : "overijssel" }, "totalPersons" : 40 }
{ "_id" : { "state" : "queensland" }, "totalPersons" : 40 }
{ "_id" : { "state" : "sjælland" }, "totalPersons" : 38 }
{ "_id" : { "state" : "nova scotia" }, "totalPersons" : 34 }
{ "_id" : { "state" : "canterbury" }, "totalPersons" : 32 }
{ "_id" : { "state" : "northwest territories" }, "totalPersons" : 32 }
{ "_id" : { "state" : "gelderland" }, "totalPersons" : 32 }
{ "_id" : { "state" : "yukon" }, "totalPersons" : 32 }
{ "_id" : { "state" : "bayern" }, "totalPersons" : 30 }
{ "_id" : { "state" : "tasmania" }, "totalPersons" : 30 }
{ "_id" : { "state" : "northern territory" }, "totalPersons" : 30 }
{ "_id" : { "state" : "nunavut" }, "totalPersons" : 28 } */



/* ********************************************************* */
// Add new field
db.persons.aggregate([
	{
		$project: {
			_id: 0,
			gender: 1,
			fullName: {
				$concat: [
					{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
					{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
					" ",
					{ $toUpper: "$name.last" }
				]
			}
		}
	}
]).pretty()

// Result
/* 
{ "gender" : "male", "fullName" : "zachary lo" }
{ "gender" : "male", "fullName" : "harvey chambers" }
{ "gender" : "male", "fullName" : "carl jacobs" }
{ "gender" : "male", "fullName" : "gideon van drongelen" }
{ "gender" : "female", "fullName" : "پریا پارسا" }
{ "gender" : "female", "fullName" : "maeva wilson" }
{ "gender" : "female", "fullName" : "olav oehme" }
{ "gender" : "male", "fullName" : "elijah lewis" }
{ "gender" : "male", "fullName" : "victor pedersen" }
{ "gender" : "male", "fullName" : "isolino viana" }
{ "gender" : "female", "fullName" : "shona kemperman" }
{ "gender" : "female", "fullName" : "louise graham" }
{ "gender" : "female", "fullName" : "mestan kaplangı" }
{ "gender" : "female", "fullName" : "katie welch" }
{ "gender" : "female", "fullName" : "sandra lorenzo" }
{ "gender" : "male", "fullName" : "بنیامین سالاری" }
{ "gender" : "female", "fullName" : "andreia arnaud" }
{ "gender" : "female", "fullName" : "madeleine till" }
{ "gender" : "female", "fullName" : "anaëlle adam" }
{ "gender" : "female", "fullName" : "anne ruiz" }
 */


/* ********************************************************* */
db.persons.aggregate([{
		$project: {
			_id: 0, name: 1, email: 1, location: {
				type: "Point", coordinates: [
					{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0, onNull: 0 } },
					{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0, onNull: 0 } }] } } },
	{
		$project: {
			gender: 1,
			email: 1,
			location: 1,
			fullName: {
				$concat: [
					{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
					{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
					" ",
					{ $toUpper: "$name.last" }
				]
			}
		}
	}
]).pretty()



/* ********************************************************* */
db.persons.aggregate([{
	$project: {
		_id: 0,
		name: 1,
		email: 1,
		birthdate: { $convert: { input: "$dob.date", to: "date" } },
		age: "$dob.age",
		location: {
			type: "Point", coordinates: [
				{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0.0, onNull: 0.0 } },
				{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0.0, onNull: 0.0 } }] } } },
{
	$project: {
		gender: 1,
		email: 1,
		location: 1,
		birthdate: 1,
		age: 1,
		fullName: {
			$concat: [
				{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
				{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
				" ",
				{ $toUpper: "$name.last" }
			]
		}
	}
}
]).pretty()

// Result
/* {
        "location" : {
                "type" : "Point",
                "coordinates" : [
                        78.0207,
                        -84.1572
                ]
        },
        "email" : "anne.ruiz@example.com",
        "birthdate" : ISODate("1982-10-09T12:10:42Z"),
        "age" : 35,
        "fullName" : "Anne RUIZ"
}
 */



/* ********************************************************* */
// Shortcut for convert
db.persons.aggregate([{
	$project: {
		_id: 0,
		name: 1,
		email: 1,
		birthdate: { $toDate: "$dob.date" },
		age: "$dob.age",
		location: {
			type: "Point", coordinates: [
				{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0, onNull: 0 } },
				{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0, onNull: 0 } }] } } },
{
	$project: {
		gender: 1,
		email: 1,
		location: 1,
		birthdate: 1,
		age: 1,
		fullName: {
			$concat: [
				{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
				{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
				" ",
				{ $toUpper: "$name.last" }
			]
		}
	}
}
]).pretty()



/* ********************************************************* */
// Grouping by year
db.persons.aggregate([{
	$project: {
		_id: 0,
		name: 1,
		email: 1,
		birthdate: { $toDate: "$dob.date" },
		age: "$dob.age",
		location: {
			type: "Point", coordinates: [
				{ $convert: { input: "$location.coordinates.longitude", to: "double", onError: 0, onNull: 0 } },
				{ $convert: { input: "$location.coordinates.latitude", to: "double", onError: 0, onNull: 0 } }] } } },
{
	$project: {
		gender: 1,
		email: 1,
		location: 1,
		birthdate: 1,
		age: 1,
		fullName: {
			$concat: [
				{ $toUpper: { $substrCP: ['$name.first', 0, 1] } },
				{ $substrCP: ['$name.first', 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] } ]},
				" ",
				{ $toUpper: "$name.last" }
			]
		}
	}
	},
	{
		$group: { _id: { birthYear: { $isoWeekYear: "$birthdate" } }, numPersons: {$sum: 1} }
	},
	{ $sort: {numPersons: -1}}
]).pretty()