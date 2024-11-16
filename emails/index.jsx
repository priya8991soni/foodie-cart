import { Button, Html } from "@react-email/components";
import * as React from "react";

export default function Email() {
  return (
    <Html>
      <table>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
        </tr>
        <tr>
            <td>Anom</td>
            <td>19</td>
            <td>Male</td>
        </tr>
        <tr>
            <td>Megha</td>
            <td>19</td>
            <td>Female</td>
        </tr>
        <tr>
            <td>Subham</td>
            <td>25</td>
            <td>Male</td>
        </tr>
    </table>
    </Html>
  );
}

//         <tr>
//             <th>Name</th>
//             <th>Age</th>
//             <th>Gender</th>
//         </tr>
//         <tr>
//             <td>Anom</td>
//             <td>19</td>
//             <td>Male</td>
//         </tr>
//         <tr>
//             <td>Megha</td>
//             <td>19</td>
//             <td>Female</td>
//         </tr>
//         <tr>
//             <td>Subham</td>
//             <td>25</td>
//             <td>Male</td>
//         </tr>
//     </table>
// </div>
// );
// }

// export default App;