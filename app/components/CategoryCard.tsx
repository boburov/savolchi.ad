import Link from "next/link";

interface Lesson {
  id: number;
  title: string;
}

interface Course {
  id: number;
  name: string;
  description: string;
  lessons: Lesson[];
  participants: number;
}

interface Props {
  course: Course;
}

const CategoryCard = ({ course }: Props) => {
  return (
    <Link href={`/courses/${course.id}`}>
      <div className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition cursor-pointer border border-gray-100">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">{course.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{course.description}</p>
        <div className="flex justify-between items-center text-gray-600 text-sm">
          <span>📚 {course.lessons.length} ta test</span>
          <span>👥 {course.participants} ta foydalanuvchi</span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
