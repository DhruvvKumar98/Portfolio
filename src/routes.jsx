// To add a new page:
// 1. Create src/pages/NewPage.jsx
// 2. Import it below
// 3. Add a route object
// 4. Add to Nav.jsx items array
import Home       from './pages/Home.jsx';
import Experience from './pages/Experience.jsx';
import Projects   from './pages/Projects.jsx';
import Skills     from './pages/Skills.jsx';
import Resume     from './pages/Resume.jsx';
import Contact    from './pages/Contact.jsx';
import Hobbies    from './pages/Hobbies.jsx';
import Writing    from './pages/Writing.jsx';
import Building   from './pages/Building.jsx';
export default [
  { path: '/',           component: Home       },
  { path: '/experience', component: Experience },
  { path: '/projects',   component: Projects   },
  { path: '/skills',     component: Skills     },
  { path: '/resume',     component: Resume     },
  { path: '/contact',    component: Contact    },
  { path: '/hobbies',    component: Hobbies    },
  { path: '/writing',    component: Writing    },
  { path: '/building',   component: Building   },
];
