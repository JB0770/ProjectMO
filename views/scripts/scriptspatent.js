var currentStep = 1;
  var totalSteps = 6;

  function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.style.display = 'none');
    document.getElementById(`step${step}`).style.display = 'block';
    currentStep = step;
    document.getElementById('prevStep').style.display = currentStep === 1 ? 'none' : 'inline-block';
    document.getElementById('nextStep').style.display = currentStep === totalSteps ? 'none' : 'inline-block';
    document.getElementById('closeModal').style.display = currentStep === totalSteps ? 'inline-block' : 'none';
  }

  function changeStep(direction) {
    showStep(currentStep + direction);
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    var patentStepsModal = new bootstrap.Modal(document.getElementById('patentStepsModal'));
    patentStepsModal.show();
  });



    function showCreatePatentModal() {
      var createPatentModal = new bootstrap.Modal(document.getElementById('createPatentModal'));
      createPatentModal.show();
      document.querySelector('.modal-backdrop').style.position = 'absolute';
    }

    function showEditModal(idpatente) {
      fetch(`/indexpatent/updatepatent/${idpatente}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('editPatentForm').action = `/indexpatent/updatepatent/${idpatente}`;
          document.getElementById('editNombre').value = data.nombre;
          document.getElementById('editTipo_patente').value = data.tipo_patente;
          document.getElementById('editFecha_solicitud').value = new Date(data.fecha_solicitud).toISOString().split('T')[0];
          document.getElementById('editEstado_solicitud').value = data.estado_solicitud;
          document.getElementById('editDescripcion').value = data.descripcion;
          document.getElementById('editNovedades').value = data.novedades;
          document.getElementById('editNivel_inventivo').value = data.nivel_inventivo;
          document.getElementById('editAplicacion_industrial').value = data.aplicacion_industrial;
          document.getElementById('editReivindicaciones').value = data.reivindicaciones;
          var editPatentModal = new bootstrap.Modal(document.getElementById('editPatentModal'));
          editPatentModal.show();
          document.querySelector('.modal-backdrop').style.position = 'absolute';
        })
        .catch(error => console.error('Error:', error));
    }

    function showDetailModal(idpatente) {
      fetch(`/indexpatent/updatepatent/${idpatente}`)
        .then(response => response.json())
        .then(data => {
          document.getElementById('detailNombre').textContent = data.nombre;
          document.getElementById('detailTipo_patente').textContent = data.tipo_patente;
          document.getElementById('detailFecha_solicitud').textContent = new Date(data.fecha_solicitud).toISOString().split('T')[0];
          document.getElementById('detailEstado_solicitud').textContent = data.estado_solicitud;
          document.getElementById('detailDescripcion').textContent = data.descripcion;
          document.getElementById('detailNovedades').textContent = data.novedades;
          document.getElementById('detailNivel_inventivo').textContent = data.nivel_inventivo;
          document.getElementById('detailAplicacion_industrial').textContent = data.aplicacion_industrial;
          document.getElementById('detailReivindicaciones').textContent = data.reivindicaciones;
          var detailPatentModal = new bootstrap.Modal(document.getElementById('detailPatentModal'));
          detailPatentModal.show();
          document.querySelector('.modal-backdrop').style.position = 'absolute';
        })
        .catch(error => console.error('Error:', error));
    }

    function showDeleteModal(idpatente) {
      var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
      confirmDeleteBtn.href = `/indexpatent/deletepatent/${idpatente}`;
      var deletePatentModal = new bootstrap.Modal(document.getElementById('deletePatentModal'));
      deletePatentModal.show();
      document.querySelector('.modal-backdrop').style.position = 'absolute';
    }