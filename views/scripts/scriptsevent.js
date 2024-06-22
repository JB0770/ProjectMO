// funciones del modal de eventos
var currentEventStep = 1;
  var totalEventSteps = 2;

  function showEventStep(step) {
    document.querySelectorAll('.event-step').forEach(el => el.style.display = 'none');
    document.getElementById(`eventStep${step}`).style.display = 'block';
    currentEventStep = step;
    document.getElementById('prevEventStep').style.display = currentEventStep === 1 ? 'none' : 'inline-block';
    document.getElementById('nextEventStep').style.display = currentEventStep === totalEventSteps ? 'none' : 'inline-block';
    document.getElementById('closeEventModal').style.display = currentEventStep === totalEventSteps ? 'inline-block' : 'none';
  }

  function changeEventStep(direction) {
    showEventStep(currentEventStep + direction);
  }

  document.addEventListener('DOMContentLoaded', (event) => {
    var eventStepsModal = new bootstrap.Modal(document.getElementById('eventStepsModal'));
    eventStepsModal.show();
  });   
    function showCreateEventModal() {
        var createEventModal = new bootstrap.Modal(document.getElementById('createEventModal'));
        createEventModal.show();
        document.querySelector('.modal-backdrop').style.position = 'absolute';
    }

    function showEditModal(id_evento) {
        fetch(`/indexevent/updateevent/${id_evento}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('editEventForm').action = `/indexevent/updateevent/${id_evento}`;
                document.getElementById('editTipoevento').value = data.tipoevento;
                document.getElementById('editNombre').value = data.nombre;
                document.getElementById('editFecha').value = new Date(data.fecha).toISOString().split('T')[0];
                document.getElementById('editUbicacion').value = data.ubicacion;
                var editEventModal = new bootstrap.Modal(document.getElementById('editEventModal'));
                editEventModal.show();
                document.querySelector('.modal-backdrop').style.position = 'absolute';
            })
            .catch(error => console.error('Error:', error));
    }

    function showDeleteModal(id_evento) {
        var confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        confirmDeleteBtn.href = `/indexevent/deleteevent/${id_evento}`;
        var deleteEventModal = new bootstrap.Modal(document.getElementById('deleteEventModal'));
        deleteEventModal.show();
        document.querySelector('.modal-backdrop').style.position = 'absolute';
    }
