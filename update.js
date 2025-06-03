const { MongoClient } = require('mongodb');

// MongoDB connection string
const uri = "mongodb+srv://siddharthanandh618:mongodb38@cluster0.dstn34f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);
const dbName = 'cgpa_calculator';

// Data to be inserted/updated
const studentsData = [
    {
      "student_id": "S001",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 6
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 6
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 8
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 10
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 6
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 7
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 8
          }
        ]
      }
    },
    {
      "student_id": "S002",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 8
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 6
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 8
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 10
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 8
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 6
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 6
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 8
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 10
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 9
          }
        ]
      }
    },
    {
      "student_id": "S003",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 9
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 10
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 6
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 7
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 10
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 6
          }
        ]
      }
    },
    {
      "student_id": "S004",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 8
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 9
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 9
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 8
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 7
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 9
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 9
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 10
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 10
          }
        ]
      }
    },
    {
      "student_id": "S005",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 9
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 6
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 6
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 10
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 9
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 6
          }
        ]
      }
    },
    {
      "student_id": "S006",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 8
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 6
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 10
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 7
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 9
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 10
          }
        ]
      }
    },
    {
      "student_id": "S007",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 8
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 6
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 9
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 7
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 8
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 8
          }
        ]
      }
    },
    {
      "student_id": "S008",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 8
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 10
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 7
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 6
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 9
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 10
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 9
          }
        ]
      }
    },
    {
      "student_id": "S009",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 9
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 7
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 6
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 6
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 7
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 9
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 6
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 8
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 9
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 10
          }
        ]
      }
    },
    {
      "student_id": "S010",
      "semesters": {
        "1": [
          {
            "course_id": "19I001",
            "course_name": "Mathematics",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I002",
            "course_name": "Physics",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I003",
            "course_name": "Programming",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "2": [
          {
            "course_id": "19I004",
            "course_name": "Electronics",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I005",
            "course_name": "Data Structures",
            "credits": 4,
            "grade_point": 9
          },
          {
            "course_id": "19I006",
            "course_name": "Statistics",
            "credits": 2,
            "grade_point": 6
          }
        ],
        "3": [
          {
            "course_id": "19I007",
            "course_name": "OOP",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I008",
            "course_name": "Digital Logic",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I009",
            "course_name": "Operating Systems",
            "credits": 4,
            "grade_point": 8
          }
        ],
        "4": [
          {
            "course_id": "19I010",
            "course_name": "Computer Networks",
            "credits": 3,
            "grade_point": 8
          },
          {
            "course_id": "19I011",
            "course_name": "DBMS",
            "credits": 4,
            "grade_point": 7
          },
          {
            "course_id": "19I012",
            "course_name": "Software Engineering",
            "credits": 3,
            "grade_point": 10
          }
        ],
        "5": [
          {
            "course_id": "19I013",
            "course_name": "Web Tech",
            "credits": 3,
            "grade_point": 10
          },
          {
            "course_id": "19I014",
            "course_name": "AI",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I015",
            "course_name": "Mini Project",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "6": [
          {
            "course_id": "19I016",
            "course_name": "ML",
            "credits": 4,
            "grade_point": 10
          },
          {
            "course_id": "19I017",
            "course_name": "IoT",
            "credits": 3,
            "grade_point": 9
          },
          {
            "course_id": "19I018",
            "course_name": "Cloud Computing",
            "credits": 3,
            "grade_point": 7
          }
        ],
        "7": [
          {
            "course_id": "19I019",
            "course_name": "Cybersecurity",
            "credits": 3,
            "grade_point": 7
          },
          {
            "course_id": "19I020",
            "course_name": "Big Data",
            "credits": 3,
            "grade_point": 6
          },
          {
            "course_id": "19I021",
            "course_name": "DevOps",
            "credits": 4,
            "grade_point": 9
          }
        ],
        "8": [
          {
            "course_id": "19I022",
            "course_name": "Project Phase 1",
            "credits": 5,
            "grade_point": 7
          },
          {
            "course_id": "19I023",
            "course_name": "Project Phase 2",
            "credits": 5,
            "grade_point": 7
          },
          {
            "course_id": "19I024",
            "course_name": "Seminar",
            "credits": 2,
            "grade_point": 6
          }
        ]
      }
    }
  ];

const updateDatabase = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('cgpadb');

    for (const student of studentsData) {
      const { student_id, semesters } = student;

      // Update or insert student data
      const result = await collection.updateOne(
        { student_id }, // Filter by student ID
        { $set: { semesters } }, // Update semesters field
        { upsert: true } // Insert if the document doesn't exist
      );

      if (result.matchedCount > 0) {
        console.log(`✅ Updated data for student ID: ${student_id}`);
      } else if (result.upsertedCount > 0) {
        console.log(`✅ Inserted new data for student ID: ${student_id}`);
      }
    }
  } catch (err) {
    console.error('❌ Error updating database:', err);
  } finally {
    await client.close();
  }
};

updateDatabase();