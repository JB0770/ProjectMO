function showExpertStep(type) {
  document.getElementById('studentStep').style.display = 'none';
  document.getElementById('expertStep').style.display = 'none';

  if (type === 'student') {
      document.getElementById('studentStep').style.display = 'block';
  } else if (type === 'expert') {
      document.getElementById('expertStep').style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  var expertStepsModal = new bootstrap.Modal(document.getElementById('expertStepsModal'));
  expertStepsModal.show();
});

function showCreateExpertModal() {
  const createExpertModal = new bootstrap.Modal(document.getElementById('createExpertModal'));
  createExpertModal.show();
  document.querySelector('.modal-backdrop').style.position = 'absolute';
}

function showUpdateExpertModal(id_experto) {
  fetch(`/indexexpert/update/${id_experto}`) // Asegúrate de que esta URL sea correcta
      .then(response => response.json())
      .then(data => {
          // Poblar el formulario con los datos del experto
          document.getElementById('updateExpertForm').action = `/indexexpert/update/${id_experto}`; // Corrige la URL aquí
          document.getElementById('update_id_experto').value = data.id_experto;
          document.getElementById('update_nombre').value = data.nombre;
          document.getElementById('update_descripcion').value = data.descripcion;
          document.getElementById('update_especialidad').value = data.especialidad;
          document.getElementById('update_rol').value = data.rol;
          document.getElementById('update_email').value = data.email;
          document.getElementById('update_descripcion_detallada').value = data.descripcion_detallada;
          document.getElementById('update_telefono_contacto').value = data.telefono_contacto;
          document.getElementById('update_estado').value = data.estado;

          // Mostrar el modal de actualización
          var updateExpertModal = new bootstrap.Modal(document.getElementById('updateExpertModal'));
          updateExpertModal.show();
          document.querySelector('.modal-backdrop').style.position = 'absolute';
      })
      .catch(error => console.error('Error obteniendo los datos del experto:', error));
}

function showDeleteExpertModal(id_experto) {
  document.getElementById('confirmDeleteBtn').href = `indexexpert/delete/${id_experto}`;
  const deleteExpertModal = new bootstrap.Modal(document.getElementById('deleteExpertModal'));
  deleteExpertModal.show();
  document.querySelector('.modal-backdrop').style.position = 'absolute';
}

async function showInfoModal(id_experto) {
  try {
      const response = await fetch(`/indexexpert/update/${id_experto}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      document.getElementById('infoNombre').innerText = data.nombre;
      document.getElementById('infoDescripcion').innerText = data.descripcion;
      document.getElementById('infoDescripcionDetallada').innerText = data.descripcion_detallada;
      document.getElementById('infoEspecialidad').innerText = data.especialidad;
      document.getElementById('infoRol').innerText = data.rol;
      document.getElementById('infoEmail').innerText = data.email;
      document.getElementById('infoTelefonoContacto').innerText = data.telefono_contacto;
      document.getElementById('infoFoto').src = data.foto ? `data:image/jpeg;base64,${data.foto.toString('base64')}` : '/path/to/default-image.jpg';
      document.getElementById('infoEstado').innerText = data.estado ? 'Activo' : 'Inactivo';
      document.getElementById('estadoIcono').className = `estado-icono ${data.estado ? 'estado-activo' : 'estado-inactivo'}`;

      var infoExpertModal = new bootstrap.Modal(document.getElementById('infoExpertModal'));
      infoExpertModal.show();
      document.querySelector('.modal-backdrop').style.position = 'absolute';
  } catch (error) {
      console.error('Error:', error);
  }
}


const welcomeModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
welcomeModal.show();
