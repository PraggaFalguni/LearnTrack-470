// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function PublishCourseForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState("");
//   const [preview, setPreview] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // In a real app, this would create a new course in the database
//     setTimeout(() => {
//       setIsSubmitting(false);
//       router.push("/dashboard");
//     }, 1500);
//   };

//   return (
//     <div className="card">
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="title" className="form-label">
//             Course Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             className="form-input"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="description" className="form-label">
//             Course Description
//           </label>
//           <textarea
//             id="description"
//             className="form-input"
//             rows="4"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label htmlFor="category" className="form-label">
//               Category
//             </label>
//             <select
//               id="category"
//               className="form-input"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               required
//             >
//               <option value="">Select a category</option>
//               <option value="Web Development">Web Development</option>
//               <option value="JavaScript">JavaScript</option>
//               <option value="Design">Design</option>
//               <option value="Backend">Backend</option>
//             </select>
//           </div>

//           <div>
//             <label htmlFor="price" className="form-label">
//               Price ($)
//             </label>
//             <input
//               id="price"
//               type="number"
//               min="0"
//               step="0.01"
//               className="form-input"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//           </div>
//         </div>

//         <div>
//           <label htmlFor="preview" className="form-label">
//             Course Preview
//           </label>
//           <textarea
//             id="preview"
//             className="form-input"
//             rows="3"
//             value={preview}
//             onChange={(e) => setPreview(e.target.value)}
//             required
//             placeholder="Provide a brief preview of what students will learn in this course"
//           />
//         </div>

//         <div className="pt-4">
//           <button
//             type="submit"
//             className="btn-primary w-full md:w-auto"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Publishing..." : "Publish Course"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
