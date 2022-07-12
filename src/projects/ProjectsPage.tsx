// import { Fragment } from "react";
// import ProjectList from "./ProjectList";
// import { useProjects } from "./projectHooks";

// function ProjectsPage() {
//   const {
//     projects,
//     loading,
//     error,
//     setCurrentPage,
//     saveProject,
//     saving,
//     savingError,
//   } = useProjects();
//   // Approach 1: using promise then
//   //  useEffect(() => {
//   //    setLoading(true);
//   //    projectAPI
//   //      .get(1)
//   //      .then((data) => {
//   //        setError(null);
//   //        setLoading(false);
//   //        setProjects(data);
//   //      })
//   //      .catch((e) => {
//   //        setLoading(false);
//   //        setError(e.message);
//   //        if (e instanceof Error) {
//   //           setError(e.message);
//   //        }
//   //      });
//   //  }, []);

//   // Approach 2: using async/await
//   // useEffect(() => {
//   //   async function loadProjects() {
//   //     setLoading(true);
//   //     try {
//   //       const data = await projectAPI.get(currentPage);
//   //       setError("");
//   //       if (currentPage === 1) {
//   //         setProjects(data);
//   //       } else {
//   //         setProjects((projects) => [...projects, ...data]);
//   //       }
//   //     } catch (e) {
//   //       if (e instanceof Error) {
//   //         setError(e.message);
//   //       }
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   }
//   //   loadProjects();
//   // }, [currentPage]);

//   const handleMoreClick = () => {
//     setCurrentPage((currentPage) => currentPage + 1);
//   };

//   return (
//     <Fragment>
//       <h1>Projects</h1>
//       {saving && <span className="toast">Saving ...</span>}
//       {(error || savingError) && (
//         <div className="row">
//           <div className="card large error">
//             <section>
//               <p>
//                 <span className="icon-alert inverse"></span>
//                 {error} {savingError}
//               </p>
//             </section>
//           </div>
//         </div>
//       )}
//       <ProjectList projects={projects} />
//       {!loading && !error && (
//         <div className="row">
//           <div className="col-sm-12">
//             <div className="button-group fluid">
//               <button className="button default" onClick={handleMoreClick}>
//                 More...
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {loading && (
//         <div className="center-page">
//           <span className="spinner primary"></span>
//           <p>Loading...</p>
//         </div>
//       )}
//     </Fragment>
//   );
// }

// export default ProjectsPage;
import { useProjects } from "./projectHooks";
import ProjectList from "./ProjectList";

function ProjectsPage() {
  const {
    data,
    isLoading,
    error,
    isError,
    isFetching,
    page,
    setPage,
    isPreviousData,
  } = useProjects();

  return (
    <>
      <h1>Projects</h1>

      {data ? (
        <>
          {isFetching && <span className="toast">Refreshing...</span>}
          <ProjectList projects={data} />
          <div className="row">
            <div className="col-sm-4">Current page: {page + 1}</div>
            <div className="col-sm-4">
              <div className="button-group right">
                <button
                  className="button "
                  onClick={() => setPage((oldPage) => oldPage - 1)}
                  disabled={page === 0}
                >
                  Previous
                </button>
                <button
                  className="button"
                  onClick={() => {
                    if (!isPreviousData) {
                      setPage((oldPage) => oldPage + 1);
                    }
                  }}
                  disabled={data.length !== 10}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      ) : isLoading ? (
        <div className="center-page">
          <span className="spinner primary"></span>
          <p>Loading...</p>
        </div>
      ) : isError && error instanceof Error ? (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error.message}
              </p>
            </section>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ProjectsPage;

// return (
//   <>
//     <h1>Header</h1>
//     {data ? (
//       <p>data</p>
//     ) : isLoading ? (
//       <p>Loading...</p>
//     ) : isError ? (
//       <p>Error Message</p>
//     ) : null}
//   </>
// );
