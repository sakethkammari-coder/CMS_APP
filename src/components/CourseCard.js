import { Link } from "react-router-dom";

function CourseCard({ course }) {

  return (

    <div className="col-md-3 mb-4">

      <Link
        to={`/course/${course._id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >

        <div className="card h-100 course-card shadow-sm">

          <img
            src={course.thumbnail}
            className="card-img-top"
            height="200"
            alt={course.title}
          />

          <div className="card-body">

            <h5 className="card-title">
              {course.title}
            </h5>

            <p className="card-text">
              <strong>Instructor:</strong> {course.instructor}
            </p>

            <p className="card-text">
              <strong>Duration:</strong> {course.duration}
            </p>

            <p className="card-text">
              <strong>Level:</strong> {course.level}
            </p>

            <button className="btn btn-primary">
              View Course
            </button>

          </div>

        </div>

      </Link>

    </div>

  );

}

export default CourseCard;