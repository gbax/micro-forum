<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Список форумов</title>
    <c:import url="../include/templates/messageTemplate.jsp"/>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/frameworks/underscore.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/frameworks/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/frameworks/backbone.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/frameworks/handlebars-v1.3.0.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/application/application.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/application/models.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/application/views.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/application/collections.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/application/router.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/topic.js"></script>
</head>
<body>
<c:import url="../include/login.jsp"/>

<table id="messageTable">
    <thead>
    <tr>
        <td>
            Номер
        </td>
        <td>
            Сообщение
        </td>
    </tr>
    </thead>
</table>

</body>
</html>